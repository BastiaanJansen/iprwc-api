import { Router, Request, Response } from "express";
import { DBFindAllResponse } from "../../../../../utils/db-find-all-response";
import { Filter } from "../../../../../utils/filter";
import { isInt } from "../../../../../utils/validator/is-int";
import {
    parseBody,
    parseFilter,
    parseParam,
} from "../../../../../utils/validator/validator";
import { orderHasItem } from "../../../../middleware/order-has-item";
import { CreateOrderItemDTO } from "../../../order/order-item/dto/create-order-item.dto";
import { UpdateOrderItemDTO } from "../../../order/order-item/dto/update-order-item.dto";
import { OrderItem } from "../../../order/order-item/order-item.model";
import * as orderItemController from "./order-item.controller";

const router: Router = Router({ mergeParams: true });

router.get("/", [parseFilter(Filter)], async (req: Request, res: Response) => {
    const orderID = +req.params.orderID;
    const filter = req.filter;

    const items: DBFindAllResponse<
        OrderItem[]
    > = await orderItemController.findAll(orderID, filter);

    res.json(items);
});

router.get(
    "/:orderItemID",
    [parseParam("orderItemID", isInt)],
    orderHasItem,
    async (req: Request, res: Response) => {
        const orderItemID = +req.params.orderItemID;

        const item: OrderItem = await orderItemController.findByID(orderItemID);

        res.json(item);
    }
);

router.post(
    "/",
    [parseBody(CreateOrderItemDTO)],
    async (req: Request, res: Response) => {
        const dto = req.body;
        const orderID = +req.params.orderID;

        const item: OrderItem = await orderItemController.create(orderID, dto);

        res.json(item);
    }
);

router.patch(
    "/:orderItemID",
    [parseParam("orderItemID", isInt), parseBody(UpdateOrderItemDTO)],
    orderHasItem,
    async (req: Request, res: Response) => {
        const dto = req.body;
        const orderItemID = +req.params.orderItemID;

        const item: OrderItem = await orderItemController.update(
            orderItemID,
            dto
        );

        res.json(item);
    }
);

router.delete(
    "/:orderItemID",
    [parseParam("orderItemID", isInt)],
    orderHasItem,
    async (req: Request, res: Response) => {
        const orderItemID = +req.params.orderItemID;

        await orderItemController.remove(orderItemID);

        res.json({ success: true });
    }
);

export default router;
