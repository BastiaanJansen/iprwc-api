import { Router, Request, Response } from "express";
import { DBFindAllResponse } from "../../../../utils/db-find-all-response";
import { isInt } from "../../../../utils/validator/is-int";
import { parseBody, parseParam } from "../../../../utils/validator/validator";
import { CreateOrderDTO } from "../../order/dto/create-order.dto";
import { Order } from "../../order/order.model";
import * as orderController from "./order.controller";
import orderItemRoutes from "./order-item/order-item.routes";
import { isOrderHolder } from "../../../middleware/is-order-holder";

const router: Router = Router({ mergeParams: true });

router.get("/", async (req: Request, res: Response) => {
    const userID = +req.params.userID;

    const order: DBFindAllResponse<Order[]> = await orderController.findAll({
        user: userID,
    });

    res.json(order);
});

router.get(
    "/:orderID",
    [parseParam("orderID", isInt)],
    isOrderHolder,
    async (req: Request, res: Response) => {
        const orderID = +req.params.orderID;

        const order: Order = await orderController.findByID(orderID);

        res.json(order);
    }
);

router.post(
    "/",
    [parseBody(CreateOrderDTO)],
    async (req: Request, res: Response) => {
        const dto = req.body;
        const userID = +req.params.userID;

        const order: Order = await orderController.create(userID, dto);

        res.json(order);
    }
);

router.delete(
    "/:orderID",
    [parseParam("orderID", isInt)],
    isOrderHolder,
    async (req: Request, res: Response) => {
        const orderID = +req.params.orderID;

        await orderController.remove(orderID);

        res.json({ success: true });
    }
);

router.use(
    "/:orderID/items",
    parseParam("orderID", isInt),
    isOrderHolder,
    orderItemRoutes
);

export default router;
