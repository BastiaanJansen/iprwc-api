import * as orderDAO from "../../order/order.dao";
import { NotFoundException } from "../../../../exceptions/NotFoundException";
import { Order } from "../../order/order.model";
import { FilterOrderDTO } from "../../order/dto/filter-order.dto";
import { CreateOrderDTO } from "../../order/dto/create-order.dto";

export const findAll = async (filter: FilterOrderDTO) => {
    return await orderDAO.findAll(filter);
};

export const findByID = async (id: number): Promise<Order> => {
    const order = await orderDAO.findByID(id);

    if (!order) throw new NotFoundException("Order does not exist");

    return order;
};

export const create = async (
    userID: number,
    dto: CreateOrderDTO
): Promise<Order> => {
    return await orderDAO.create(userID, dto);
};

export const remove = async (orderID: number): Promise<void> => {
    const order = await orderDAO.findByID(orderID);

    if (!order) throw new NotFoundException("Order does not exist");

    orderDAO.remove(orderID);
};
