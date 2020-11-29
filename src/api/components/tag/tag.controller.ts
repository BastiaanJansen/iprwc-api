import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { Filter } from "../../../utils/filter";
import { Tag } from "./tag.model";
import * as tagDAO from "./tag.dao";
import { NotFoundException } from "../../../exceptions/NotFoundException";
import { CreateTagDTO } from "./dto/create-tag.dto";
import { UpdateTagDTO } from "./dto/update-tag.dto";

export const findAll = async (
    filter: Filter
): Promise<DBFindAllResponse<Tag[]>> => {
    const tags = await tagDAO.findAll(filter);
    return tags;
};

export const findByID = async (id: number): Promise<Tag> => {
    const tag = await tagDAO.findByID(id);

    if (!tag) throw new NotFoundException("Tag does not exist");

    return tag;
};

export const create = async (dto: CreateTagDTO): Promise<Tag> => {
    return await tagDAO.create(dto);
};

export const update = async (id: number, dto: UpdateTagDTO): Promise<Tag> => {
    return await tagDAO.update(id, dto);
};

export const remove = async (id: number): Promise<void> => {
    return await tagDAO.remove(id);
};
