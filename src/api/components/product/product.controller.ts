import { NotFoundException } from "../../../exceptions/NotFoundException";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { CreateProductDTO } from "./dto/create-product.dto";
import { FilterProductDTO } from "./dto/filter-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import * as productDAO from "./product.dao";
import { Product } from "./product.model";

export const findAll = async (
    filter: FilterProductDTO
): Promise<DBFindAllResponse<Product[]>> => {
    const products = await productDAO.findAll(filter);
    return products;
};

export const findByID = async (id: number): Promise<Product> => {
    const product = await productDAO.findByID(id);

    if (!product) throw new NotFoundException("Product does not exist");

    return product;
};

export const create = async (dto: CreateProductDTO): Promise<Product> => {
    return await productDAO.create(dto);
};

export const update = async (
    id: number,
    dto: UpdateProductDTO
): Promise<Product> => {
    return await productDAO.update(id, dto);
};

export const remove = async (id: number): Promise<void> => {
    return await productDAO.remove(id);
};
