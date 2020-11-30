import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { Filter } from "../../../utils/filter";
import * as categoryDAO from "./category.dao";
import { NotFoundException } from "../../../exceptions/NotFoundException";
import { Category } from "./category.model";
import { UpdateCategoryDTO } from "./dto/update-category.dto";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { DeleteResult } from "typeorm";

export const findAll = async (
    filter: Filter
): Promise<DBFindAllResponse<Category[]>> => {
    const categories = await categoryDAO.findAll(filter);
    return categories;
};

export const findByID = async (id: number): Promise<Category> => {
    const category = await categoryDAO.findByID(id);

    if (!category) throw new NotFoundException("Category does not exist");

    return category;
};

export const create = async (dto: CreateCategoryDTO): Promise<Category> => {
    return await categoryDAO.create(dto);
};

export const update = async (
    id: number,
    dto: UpdateCategoryDTO
): Promise<Category> => {
    return await categoryDAO.update(id, dto);
};

export const remove = async (id: number): Promise<DeleteResult> => {
    return await categoryDAO.remove(id);
};
