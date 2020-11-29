import { NotFoundException } from "../../../exceptions/NotFoundException";
import { DBResponse } from "../../../utils/db-response";
import { FilterProductDTO } from "./dto/filter-product.dto";
import * as productDAO from "./product.dao";
import { Product } from "./product.model";

export const findAll = async (
    filter: FilterProductDTO
): Promise<DBResponse<Product[]>> => {
    const products = await productDAO.findAll(filter);
    return products;
};

export const findByID = async (id: number): Promise<Product> => {
    const product = await productDAO.findByID(id);

    if (!product) throw new NotFoundException("Product does not exist");

    return product;
};
