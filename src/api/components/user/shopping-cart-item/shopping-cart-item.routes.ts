import { Router, Request, Response } from "express";
import { DBFindAllResponse } from "../../../../utils/db-find-all-response";
import { Filter } from "../../../../utils/filter";
import {
    parseBody,
    parseFilter,
    parseParam,
} from "../../../../utils/validator/validator";
import { ShoppingCartItem } from "./shopping-cart-item.model";
import * as shoppingCartItemController from "./shopping-cart-item.controller";
import { isInt } from "../../../../utils/validator/is-int";
import { CreateShoppingCartItemDTO } from "./dto/create-shopping-cart-item.dto";
import { isAdmin } from "../../../middleware/is-admin";

const router: Router = Router({ mergeParams: true });

router.get("/", [parseFilter(Filter)], async (req: Request, res: Response) => {
    const filter: Filter = req.filter;

    const items: DBFindAllResponse<
        ShoppingCartItem[]
    > = await shoppingCartItemController.findAll(filter);

    res.json(items);
});

router.get(
    "/:itemID",
    [parseParam("itemID", isInt)],
    async (req: Request, res: Response) => {
        const id = +req.params.id;

        const item: ShoppingCartItem = await shoppingCartItemController.findByID(
            id
        );

        res.json(item);
    }
);

router.post(
    "/",
    [parseBody(CreateShoppingCartItemDTO)],
    isAdmin,
    async (req: Request, res: Response) => {
        const dto = req.body;

        const item: ShoppingCartItem = await shoppingCartItemController.create(
            dto
        );

        res.json({
            result: item,
        });
    }
);

export default router;
