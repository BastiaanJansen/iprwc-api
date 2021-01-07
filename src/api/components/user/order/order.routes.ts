import { Router, Request, Response } from "express";
import { DBFindAllResponse } from "../../../../utils/db-find-all-response";
import { parseBody } from "../../../../utils/validator/validator";
import { CreateOrderDTO } from "../../order/dto/create-order.dto";
import { Order } from "../../order/order.model";
import * as orderController from "./order.controller";

const router: Router = Router({ mergeParams: true });

router.get(
    "/", 
    async (req: Request, res: Response) => {
        const userID = +req.params.userID;

        const order: DBFindAllResponse<Order[]> = await orderController.findAll({ user: userID });

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

export default router;