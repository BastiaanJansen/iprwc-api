import { Request, Response, NextFunction } from "express";
import { ForbiddenException } from "../../exceptions/ForbiddenException";
import * as orderDAO from "../components/order/order.dao";
export const isOrderHolder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isOrderHolder = await orderDAO.userIsOrderHolder(
        +req.params.userID,
        +req.params.orderID
    );

    if (!isOrderHolder)
        return next(new ForbiddenException("You are not order holder"));

    next();
};
