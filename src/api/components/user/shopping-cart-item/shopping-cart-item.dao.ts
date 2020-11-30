import {
    DeleteResult,
    EntityManager,
    getManager,
    getRepository,
    SelectQueryBuilder,
} from "typeorm";
import { DBFindAllResponse } from "../../../../utils/db-find-all-response";
import { addDefaultFilter } from "../../../../utils/default-filter";
import { Filter } from "../../../../utils/filter";
import { ShoppingCartItem } from "./shopping-cart-item.model";
import { CreateShoppingCartItemDTO } from "./dto/create-shopping-cart-item.dto";
import { Product } from "../../product/product.model";
import { BadRequestException } from "../../../../exceptions/BadRequestException";
import { UpdateShoppingCartItemDTO } from "./dto/update-shopping-cart-item.dto";

export const findAll = async (
    filter: Filter
): Promise<DBFindAllResponse<ShoppingCartItem[]>> => {
    const builder: SelectQueryBuilder<ShoppingCartItem> = getRepository(
        ShoppingCartItem
    ).createQueryBuilder("item");

    builder
        .innerJoinAndSelect("item.product", "product")
        .innerJoinAndSelect("product.brand", "brand")
        .innerJoinAndSelect("product.category", "category")
        .leftJoinAndSelect("product.tags", "tags");

    addDefaultFilter(builder, filter);

    const items = await builder.getManyAndCount();

    return {
        result: items[0],
        count: items[1],
    };
};

export const findByID = async (
    id: number
): Promise<ShoppingCartItem | undefined> => {
    const builder: SelectQueryBuilder<ShoppingCartItem> = getRepository(
        ShoppingCartItem
    ).createQueryBuilder("item");

    builder
        .innerJoinAndSelect("item.product", "product")
        .innerJoinAndSelect("product.brand", "brand")
        .innerJoinAndSelect("product.category", "category")
        .leftJoinAndSelect("product.tags", "tags");

    builder.where("item.id = :id", { id });

    const item = await builder.getOne();

    return item;
};

export const create = async (
    dto: CreateShoppingCartItemDTO
): Promise<ShoppingCartItem> => {
    return getManager().transaction(async (manager: EntityManager) => {
        const product = await manager
            .getRepository(Product)
            .findOne(dto.productID);

        if (!product) throw new BadRequestException("Product does not exist");

        const item = new ShoppingCartItem();
        item.product = product;
        item.quantity = dto.quantity;

        return manager.getRepository(ShoppingCartItem).save(item);
    });
};

export const update = async (
    id: number,
    dto: UpdateShoppingCartItemDTO
): Promise<ShoppingCartItem> => {
    return getRepository(ShoppingCartItem).save({
        id,
        quantity: dto.quantity,
    });
};

export const remove = async (id: number): Promise<DeleteResult> => {
    return getRepository(ShoppingCartItem).delete(id);
};
