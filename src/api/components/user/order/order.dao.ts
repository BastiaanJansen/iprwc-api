import { getRepository } from "typeorm";
import { BadRequestException } from "../../../../exceptions/BadRequestException";
import { User } from "../user.model";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "./order.model";

export const create = async (userID: number, dto: CreateOrderDTO): Promise<Order> => {
    const order: Order = new Order();
    order.user = <any>userID;
    order.products = <any>dto.productID;

    return getRepository(Order).save(order);
};