import { SelectQueryBuilder } from "typeorm";
import { Filter, OrderDirection } from "./filter";

export function addDefaultFilter<T>(
    builder: SelectQueryBuilder<T>,
    filter: Filter
): SelectQueryBuilder<T> {
    if (filter.skip) builder.skip(filter.skip);
    if (filter.take) builder.take(filter.take);

    if (filter.order) {
        let order = filter.order;
        let direction = filter.orderDirection;
        const splitted = filter.order.split(".");
        if (splitted.length == 1)
            order = `${escape(builder.alias)}.${escape(order)}`;

        builder.orderBy(
            escape(order),
            direction ? direction : OrderDirection.ASC
        );
    }

    return builder;
}
