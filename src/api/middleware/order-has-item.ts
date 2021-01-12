import { Request, Response, NextFunction } from "express";
import { ForbiddenException } from "../../exceptions/ForbiddenException";
import * as orderItemDAO from "../components/order/order-item/order-item.dao";
export const orderHasItem = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const orderHasItem = await orderItemDAO.orderHasItem(
        +req.params.orderID,
        +req.params.orderItemID
    );

    if (!orderHasItem)
        return next(new ForbiddenException("Item does not belong to order"));

    next();
};
