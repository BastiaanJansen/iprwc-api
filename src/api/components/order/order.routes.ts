import { Router, Request, Response } from "express";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "./order.model";
import * as orderController from "./order.controller";
import { parseBody, parseFilter, parseParam } from "../../../utils/validator/validator";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { FilterOrderDTO } from "./dto/filter-order.dto";
import { isInt } from "../../../utils/validator/is-int";
import { UpdateOrderDTO } from "./dto/update-order.dto";

const router: Router = Router({ mergeParams: true });

router.get(
    "/",
    [parseFilter(FilterOrderDTO)],
    async (req: Request, res: Response) => {
        const filter = req.filter;

        const orders: DBFindAllResponse<Order[]> = await orderController.findAll(filter);

        res.json(orders);
    }
);

router.get(
    "/:orderID",
    [parseParam("orderID", isInt)],
    async (req: Request, res: Response) => {
        const orderID = +req.params.orderID;

        const order: Order = await orderController.findByID(orderID);

        res.json({
            result: order
        });
    }
);

router.patch(
    "/:orderID",
    [parseParam("orderID", isInt),
    parseBody(UpdateOrderDTO)],
    async (req: Request, res: Response) => {
        const orderID = +req.params.orderID;
        const dto = req.body;

        const order: Order = await orderController.update(orderID, dto);

        res.json({
            result: order
        });
    }
);

router.delete(
    "/:orderID",
    [parseParam("orderID", isInt)],
    async (req: Request, res: Response) => {
        const orderID = +req.params.orderID;

        await orderController.remove(orderID);

        res.json({ success: true });
    }
);

export default router;