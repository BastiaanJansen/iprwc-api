import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { Filter } from "../../../utils/filter";
import * as brandDAO from "./brand.dao";
import { NotFoundException } from "../../../exceptions/NotFoundException";
import { Brand } from "./brand.model";
import { UpdateBrandDTO } from "./dto/update-brand.dto";
import { CreateBrandDTO } from "./dto/create-brand.dto";

export const findAll = async (
    filter: Filter
): Promise<DBFindAllResponse<Brand[]>> => {
    const brands = await brandDAO.findAll(filter);
    return brands;
};

export const findByID = async (id: number): Promise<Brand> => {
    const brand = await brandDAO.findByID(id);

    if (!brand) throw new NotFoundException("Brand does not exist");

    return brand;
};

export const create = async (dto: CreateBrandDTO): Promise<Brand> => {
    return await brandDAO.create(dto);
};

export const update = async (
    id: number,
    dto: UpdateBrandDTO
): Promise<Brand> => {
    return await brandDAO.update(id, dto);
};

export const remove = async (id: number): Promise<void> => {
    return await brandDAO.remove(id);
};
