import { getRepository, SelectQueryBuilder } from "typeorm";
import { BadRequestException } from "../../../../exceptions/BadRequestException";
import { DBFindAllResponse } from "../../../../utils/db-find-all-response";
import { addDefaultFilter } from "../../../../utils/default-filter";
import { FilterOrderItemDTO } from "./dto/filter-order-item.dto";
import { Product } from "../../product/product.model";
import { Order } from "../order.model";
import { CreateOrderItemDTO } from "./dto/create-order-item.dto";
import { UpdateOrderItemDTO } from "./dto/update-order-item.dto";
import { OrderItem } from "./order-item.model";

export const create = async (
    orderID: number,
    dto: CreateOrderItemDTO
): Promise<OrderItem> => {
    const order = await getRepository(Order).findOne(orderID);
    const product = await getRepository(Product).findOne(dto.product);

    if (!order) throw new BadRequestException("Order does not exist");
    if (!product) throw new BadRequestException("Product does not exist");

    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = dto.quantity;

    return getRepository(OrderItem).save(item);
};

export const findAll = async (
    filter: FilterOrderItemDTO
): Promise<DBFindAllResponse<OrderItem[]>> => {
    const builder: SelectQueryBuilder<OrderItem> = getRepository(
        OrderItem
    ).createQueryBuilder("item");

    addDefaultFilter(builder, filter);

    if (filter.orderID)
        builder.andWhere("item.order = :order", { order: filter.orderID });

    const items = await builder.getManyAndCount();

    return {
        result: items[0],
        count: items[1],
    };
};

export const findByID = async (id: number): Promise<OrderItem | undefined> => {
    return getRepository(OrderItem).findOne(id);
};

export const update = async (
    id: number,
    dto: UpdateOrderItemDTO
): Promise<OrderItem> => {
    const product = await getRepository(Product).findOne(dto.product);

    if (dto.product && !product)
        throw new BadRequestException("Product does not exist");

    return getRepository(OrderItem).save({
        id,
        quantity: dto.quantity,
        product,
    });
};

export const remove = async (id: number): Promise<void> => {
    getRepository(OrderItem).delete(id);
};

export const orderHasItem = async (
    orderID: number,
    itemID: number
): Promise<boolean> => {
    const item = await getRepository(OrderItem).findOne(itemID, {
        where: {
            order: orderID,
        },
    });

    return !!item;
};
