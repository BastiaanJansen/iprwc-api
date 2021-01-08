import { DeleteResult, getRepository, Repository, SelectQueryBuilder } from "typeorm";
import { BadRequestException } from "../../../exceptions/BadRequestException";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { addDefaultFilter } from "../../../utils/default-filter";
import { Product } from "../product/product.model";
import { User } from "../user/user.model";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { FilterOrderDTO } from "./dto/filter-order.dto";
import { UpdateOrderDTO } from "./dto/update-order.dto";
import { OrderItem } from "./order-item/order-item.model";
import { Order } from "./order.model";

export const findAll = async (filter: FilterOrderDTO): Promise<DBFindAllResponse<Order[]>> => {
    const builder: SelectQueryBuilder<Order> = getRepository(Order).createQueryBuilder("order");

    builder.innerJoinAndSelect("order.items", "items").innerJoinAndSelect("items.product", "product");

    addDefaultFilter(builder, filter);

    if (filter.user)
        builder.andWhere("order.user = :user", { user: filter.user })

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
    const productRepository: Repository<Product> = getRepository(Product);
    const user = await getRepository(User).findOne(userID);

    if (!user) throw new BadRequestException("User does not exist");

    const items: OrderItem[] = [];

    for (const itemDTO of dto.productItems) {
        const product = await productRepository.findOne(itemDTO.product);
        if (!product) throw new BadRequestException(`Product ${itemDTO.product} does not exist`);
        const item = new OrderItem();
        item.quantity = itemDTO.quantity;
        item.product = product;
        items.push(item);
    }

    const order: Order = new Order();
    order.user = user;
    order.items = items;

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