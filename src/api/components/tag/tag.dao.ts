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
import { CreateTagDTO } from "./dto/create-tag.dto";
import { UpdateTagDTO } from "./dto/update-tag.dto";
import { Tag } from "./tag.model";

export const findAll = async (
    filter: Filter
): Promise<DBFindAllResponse<Tag[]>> => {
    const builder: SelectQueryBuilder<Tag> = getRepository(
        Tag
    ).createQueryBuilder("tag");

    builder.loadRelationCountAndMap("tag.productCount", "tag.products");

    addDefaultFilter(builder, filter);

    const tags = await builder.getManyAndCount();

    return {
        result: tags[0],
        count: tags[1],
    };
};

export const findByID = async (id: number): Promise<Tag | undefined> => {
    return getRepository(Tag)
        .createQueryBuilder("tag")
        .loadRelationCountAndMap("tag.productCount", "tag.products")
        .where("id = :id", { id })
        .getOne();
};

export const create = async (dto: CreateTagDTO): Promise<Tag> => {
    const tag = new Tag();
    tag.name = dto.name;

    return getRepository(Tag).save(tag);
};

export const update = async (id: number, dto: UpdateTagDTO): Promise<Tag> => {
    return getRepository(Tag).save({
        id,
        name: dto.name,
    });
};

export const remove = async (id: number): Promise<DeleteResult> => {
    return getRepository(Tag).delete(id);
};
