import {
    DeleteResult,
    EntityManager,
    getManager,
    getRepository,
    SelectQueryBuilder,
} from "typeorm";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { addDefaultFilter } from "../../../utils/default-filter";
import { Filter } from "../../../utils/filter";
import { Brand } from "./brand.model";
import { CreateBrandDTO } from "./dto/create-brand.dto";
import { UpdateBrandDTO } from "./dto/update-brand.dto";

export const findAll = async (
    filter: Filter
): Promise<DBFindAllResponse<Brand[]>> => {
    const builder: SelectQueryBuilder<Brand> = getRepository(
        Brand
    ).createQueryBuilder("brand");

    builder.loadRelationCountAndMap("brand.productCount", "brand.products");

    addDefaultFilter(builder, filter);

    const brands = await builder.getManyAndCount();

    return {
        result: brands[0],
        count: brands[1],
    };
};

export const findByID = async (id: number): Promise<Brand | undefined> => {
    return getRepository(Brand)
        .createQueryBuilder("brand")
        .loadRelationCountAndMap("brand.productCount", "brand.products")
        .where("id = :id", { id })
        .getOne();
};

export const create = async (dto: CreateBrandDTO): Promise<Brand> => {
    const brand = new Brand();
    brand.name = dto.name;

    return getRepository(Brand).save(brand);
};

export const update = async (
    id: number,
    dto: UpdateBrandDTO
): Promise<Brand> => {
    return getRepository(Brand).save({
        id,
        name: dto.name,
    });
};

export const remove = async (id: number): Promise<DeleteResult> => {
    return getRepository(Brand).delete(id);
};
