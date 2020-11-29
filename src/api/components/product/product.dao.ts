import { ClassType } from "class-transformer/ClassTransformer";
import {
    Brackets,
    createQueryBuilder,
    getRepository,
    SelectQueryBuilder,
} from "typeorm";
import { DBResponse } from "../../../utils/db-response";
import { addDefaultFilter } from "../../../utils/default-filter";
import { Filter } from "../../../utils/filter";
import { Tag } from "../tag/tag.model";
import { FilterProductDTO } from "./dto/filter-product.dto";
import { Product } from "./product.model";

export const findAll = async (
    filter: FilterProductDTO
): Promise<DBResponse<Product[]>> => {
    const builder: SelectQueryBuilder<Product> = getRepository(
        Product
    ).createQueryBuilder("product");

    builder
        .innerJoinAndSelect("product.brand", "brand")
        .innerJoinAndSelect("product.category", "category")
        .leftJoinAndSelect("product.tags", "tags");

    addDefaultFilter(builder, filter);

    if (filter.nutriScore)
        builder.andWhere("product.nutriScore = :nutriScore", {
            nutriScore: filter.nutriScore,
        });

    if (filter.barcode)
        builder.andWhere("product.barcode = :barcode", {
            barcode: filter.barcode,
        });

    if (filter.category)
        builder.andWhere("category.id = :category", {
            category: filter.category,
        });

    if (filter.brand)
        builder.andWhere("brand.id = :brand", { brand: filter.brand });

    if (filter.tags) {
        const tags = filter.tags.split(",");
        builder.andWhere("tags.id IN (:...tags)", { tags });
    }

    const products = await builder.getManyAndCount();

    return {
        result: products[0],
        count: products[1],
    };
};

export const findByID = async (id: number): Promise<Product | undefined> => {
    const product = getRepository(Product).findOne(id, {
        relations: ["brand", "category", "tags"],
    });

    return product;
};
