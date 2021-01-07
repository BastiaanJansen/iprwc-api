import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "./order.model";
import * as orderDAO from "./order.dao";

export const create = async (userID: number, dto: CreateOrderDTO): Promise<Order> => {
    return await orderDAO.create(userID, dto);
};