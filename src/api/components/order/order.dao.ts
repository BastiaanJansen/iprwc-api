import { DeleteResult, getRepository, SelectQueryBuilder } from "typeorm";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { addDefaultFilter } from "../../../utils/default-filter";
import { Product } from "../product/product.model";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { FilterOrderDTO } from "./dto/filter-order.dto";
import { UpdateOrderDTO } from "./dto/update-order.dto";
import { Order } from "./order.model";

export const findAll = async (filter: FilterOrderDTO): Promise<DBFindAllResponse<Order[]>> => {
    const builder: SelectQueryBuilder<Order> = getRepository(Order).createQueryBuilder("order");

    addDefaultFilter(builder, filter);

    if (filter.user)
        builder.andWhere("user = :user", { user: filter.user })

    const orders = await builder.getManyAndCount();

    return {
        result: orders[0],
        count: orders[1],
    };
}

export const findByID = async (id: number): Promise<Order | undefined> => {
    return getRepository(Order).findOne(id);
}

export const findByUserID = async (userID: number): Promise<Order[]> => {
    return getRepository(Order).find({
        user: <any>userID
    })
}

export const create = async (userID: number, dto: CreateOrderDTO): Promise<Order> => {
    const products: Product[] = await getRepository(Product).findByIds(dto.productID);

    const order: Order = new Order();
    order.user = <any>userID;
    order.products = products;

    return getRepository(Order).save(order);
};

export const update = async (id: number, dto: UpdateOrderDTO): Promise<Order> => {
    const products: Product[] = await getRepository(Product).findByIds(dto.productID);

    return getRepository(Order).save({
        id,
        products
    })
}

export const remove = async (id: number): Promise<void> => {
    getRepository(Order).delete(id);
}