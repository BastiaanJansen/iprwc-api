import * as orderDAO from "../../order/order.dao";
import { NotFoundException } from "../../../../exceptions/NotFoundException";
import { Order } from "../../order/order.model";
import { FilterOrderDTO } from "../../order/dto/filter-order.dto";
import { CreateOrderDTO } from "../../order/dto/create-order.dto";

export const findAll = async (filter: FilterOrderDTO) => {
    return await orderDAO.findAll(filter);
}

export const findByID = async (id: number) => {
    const order = orderDAO.findByID(id);

    if (!order) throw new NotFoundException();

    return order;
}

export const create = async (userID: number, dto: CreateOrderDTO): Promise<Order> => {
    return await orderDAO.create(userID, dto);
};