import { dir } from "console";
import { SelectQueryBuilder } from "typeorm";
import { Filter, OrderDirection } from "./filter";

export function addDefaultFilter<T>(
    builder: SelectQueryBuilder<T>,
    filter: Filter
): SelectQueryBuilder<T> {
    if (filter.skip) builder.skip(filter.skip);
    if (filter.take) builder.take(filter.take);

    addOrderFilter(builder, filter);

    return builder;
}

function addOrderFilter<T>(builder: SelectQueryBuilder<T>, filter: Filter): SelectQueryBuilder<T> {
    if (filter.order) {
        const orders: string[] = filter.order.split(",");
        const directions = filter.orderDirection?.split(",");

        for (let i = 0; i < orders.length; i++) {
            let order = orders[i];
            const direction = directions ? directions[i] as OrderDirection : OrderDirection.ASC;

            const splitted = filter.order.split(".");

            if (splitted.length == 1) order = `${builder.alias}.${order}`;

            builder.orderBy(
                escape(order),
                direction
            );
        }
    }

    return builder
}