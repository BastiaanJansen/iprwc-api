import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "./order.model";
import * as orderDAO from "./order.dao";
import { FilterOrderDTO } from "./dto/filter-order.dto";
import { NotFoundException } from "../../../exceptions/NotFoundException";
import { UpdateOrderDTO } from "./dto/update-order.dto";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";

export const findAll = async (filter: FilterOrderDTO): Promise<DBFindAllResponse<Order[]>> => {
    return await orderDAO.findAll(filter);
}

export const findByID = async (id: number): Promise<Order> => {
    const order = await orderDAO.findByID(id);

    if (!order) throw new NotFoundException();

    return order;
}

export const create = async (userID: number, dto: CreateOrderDTO): Promise<Order> => {
    return await orderDAO.create(userID, dto);
};

export const update = async (id: number, dto: UpdateOrderDTO): Promise<Order> => {
    return await orderDAO.update(id, dto);
};

export const remove = async (id: number): Promise<void> => {
    orderDAO.remove(id);
}