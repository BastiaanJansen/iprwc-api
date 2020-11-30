import { DeleteResult, getRepository, SelectQueryBuilder } from "typeorm";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { addDefaultFilter } from "../../../utils/default-filter";
import { Filter } from "../../../utils/filter";
import { Category } from "./category.model";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdateCategoryDTO } from "./dto/update-category.dto";

export const findAll = async (
    filter: Filter
): Promise<DBFindAllResponse<Category[]>> => {
    const builder: SelectQueryBuilder<Category> = getRepository(
        Category
    ).createQueryBuilder("category");

    builder.loadRelationCountAndMap(
        "category.productCount",
        "category.products"
    );

    addDefaultFilter(builder, filter);

    const categories = await builder.getManyAndCount();

    return {
        result: categories[0],
        count: categories[1],
    };
};

export const findByID = async (id: number): Promise<Category | undefined> => {
    return getRepository(Category)
        .createQueryBuilder("category")
        .loadRelationCountAndMap("category.productCount", "category.products")
        .where("id = :id", { id })
        .getOne();
};

export const create = async (dto: CreateCategoryDTO): Promise<Category> => {
    const category = new Category();
    category.name = dto.name;

    return getRepository(Category).save(category);
};

export const update = async (
    id: number,
    dto: UpdateCategoryDTO
): Promise<Category> => {
    return getRepository(Category).save({
        id,
        name: dto.name,
    });
};

export const remove = async (id: number): Promise<DeleteResult> => {
    return getRepository(Category).delete(id);
};
