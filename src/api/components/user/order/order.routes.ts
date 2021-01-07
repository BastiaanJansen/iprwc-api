import { Router, Request, Response } from "express";
import { parseBody } from "../../../../utils/validator/validator";
import { CreateOrderDTO } from "./dto/create-order.dto";
import { Order } from "./order.model";
import * as orderController from "./order.controller";

const router: Router = Router();

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