import { DBFindAllResponse } from "../../../../../utils/db-find-all-response";
import { OrderItem } from "../../../order/order-item/order-item.model";
import * as orderItemDAO from "../../../order/order-item/order-item.dao";
import { NotFoundException } from "../../../../../exceptions/NotFoundException";
import { UpdateOrderItemDTO } from "../../../order/order-item/dto/update-order-item.dto";
import { CreateOrderItemDTO } from "../../../order/order-item/dto/create-order-item.dto";
import { FilterOrderItemDTO } from "../../../order/order-item/dto/filter-order-item.dto";

export const findAll = async (
    orderID: number,
    filter: FilterOrderItemDTO
): Promise<DBFindAllResponse<OrderItem[]>> => {
    filter.orderID = orderID;
    return await orderItemDAO.findAll(filter);
};

export const findByID = async (itemID: number): Promise<OrderItem> => {
    const item = await orderItemDAO.findByID(itemID);

    if (!item) throw new NotFoundException("Item does not exist");

    return item;
};

export const create = async (
    orderID: number,
    dto: CreateOrderItemDTO
): Promise<OrderItem> => {
    return await orderItemDAO.create(orderID, dto);
};

export const update = async (
    itemID: number,
    dto: UpdateOrderItemDTO
): Promise<OrderItem> => {
    return await orderItemDAO.update(itemID, dto);
};

export const remove = async (itemID: number): Promise<void> => {
    orderItemDAO.remove(itemID);
};
