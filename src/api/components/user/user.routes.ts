import { Router, Request, Response } from "express";
import { isInt } from "../../../utils/validator/is-int";
import { parseBody, parseParam } from "../../../utils/validator/validator";
import { isAccountHolder } from "../../middleware/is-account-holder";
import { isAdmin } from "../../middleware/is-admin";
import { isAuthenticated } from "../../middleware/is-authenticated";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import * as userController from "./user.controller";
import { User } from "./user.model";
import shoppingCartItemRoutes from "./shopping-cart-item/shopping-cart-item.routes";

const router: Router = Router();

router.get(
    "/",
    isAuthenticated,
    isAdmin,
    async (req: Request, res: Response) => {
        const users: User[] = await userController.findAll();

        res.json({
            success: true,
            result: users,
        });
    }
);

router.post(
    "/",
    [parseBody(CreateUserDTO)],
    async (req: Request, res: Response) => {
        const dto = req.body;

        const user: User = await userController.create(dto);

        res.json({
            result: user,
        });
    }
);

router.patch(
    "/:id",
    [parseParam("id", isInt), parseBody(UpdateUserDTO)],
    isAuthenticated,
    isAccountHolder,
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const dto = req.body;

        const user: User = await userController.update(id, dto);

        res.json({
            result: user,
        });
    }
);

router.use(
    "/:id/cart",
    [parseParam("id", isInt)],
    isAuthenticated,
    isAccountHolder,
    shoppingCartItemRoutes
);

export default router;
