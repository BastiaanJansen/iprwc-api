import {
    EntityManager,
    getManager,
    getRepository,
    Repository,
    SelectQueryBuilder,
} from "typeorm";
import { BadRequestException } from "../../../exceptions/BadRequestException";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { addDefaultFilter } from "../../../utils/default-filter";
import { Brand } from "../brand/brand.model";
import { Category } from "../category/category.model";
import { Tag } from "../tag/tag.model";
import { CreateProductDTO } from "./dto/create-product.dto";
import { FilterProductDTO } from "./dto/filter-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import { Product } from "./product.model";

export const findAll = async (
    filter: FilterProductDTO
): Promise<DBFindAllResponse<Product[]>> => {
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

export const create = async (dto: CreateProductDTO): Promise<Product> => {
    return getManager().transaction(async (manager: EntityManager) => {
        const brand = await manager.getRepository(Brand).findOne(dto.brandID);
        const category = await manager
            .getRepository(Category)
            .findOne(dto.categoryID);
        const tags = await manager.getRepository(Tag).findByIds(dto.tagsID);

        if (!brand) throw new BadRequestException("Brand does not exist");
        if (!category) throw new BadRequestException("Category does not exist");
        if (tags.length !== dto.tagsID.length)
            throw new BadRequestException("Tags do not exist");

        const product = new Product();
        product.name = dto.name;
        product.description = dto.description;
        product.price = dto.price;
        product.brand = brand;
        product.nutriScore = dto.nutriScore;
        product.weight = dto.weight;
        product.category = category;
        product.tags = tags;
        product.image = dto.image;
        product.barcode = dto.barcode;

        return manager.getRepository(Product).save(product);
    });
};

export const update = async (
    id: number,
    dto: UpdateProductDTO
): Promise<Product> => {
    return getManager().transaction(async (manager: EntityManager) => {
        const brand = await manager.getRepository(Brand).findOne(dto.brandID);
        const category = await manager
            .getRepository(Category)
            .findOne(dto.categoryID);
        const tags = await manager
            .getRepository(Tag)
            .findByIds(dto.tagsID ?? []);

        if (dto.brandID && !brand)
            throw new BadRequestException("Brand does not exist");
        if (dto.categoryID && !category)
            throw new BadRequestException("Category does not exist");
        if (dto.tagsID?.length !== 0 && tags.length !== dto.tagsID?.length)
            throw new BadRequestException("Tags do not exist");

        return await manager.getRepository(Product).save({
            id,
            name: dto.name,
            description: dto.description,
            price: dto.price,
            brand,
            nutriScore: dto.nutriScore,
            weight: dto.weight,
            category,
            tags: dto.tagsID ? tags : undefined,
            image: dto.image,
            barcode: dto.barcode,
        });
    });
};

export const remove = async (id: number): Promise<void> => {
    getRepository(Product).delete(id);
};
