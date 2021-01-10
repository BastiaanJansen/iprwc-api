import { Router, Request, Response } from "express";
import { isInt } from "../../../utils/validator/is-int";
import { parseBody, parseParam } from "../../../utils/validator/validator";
import { isAccountHolder } from "../../middleware/is-account-holder";
import { isAdmin } from "../../middleware/is-admin";
import { isAuthenticated } from "../../middleware/is-authenticated";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import * as userController from "./user.controller";
import orderRoutes from "./order/order.routes";
import { User } from "./user.model";

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

router.get(
    "/:userID",
    [parseParam("userID", isInt)],
    isAuthenticated,
    isAccountHolder,
    async (req: Request, res: Response) => {
        const userID = +req.params.userID;

        const user: User = await userController.findByID(userID);

        res.json(user);
    }
);

router.post(
    "/",
    [parseBody(CreateUserDTO)],
    async (req: Request, res: Response) => {
        const dto = req.body;

        const user: User = await userController.create(dto);

        res.json(user);
    }
);

router.patch(
    "/:userID",
    [parseParam("userID", isInt), parseBody(UpdateUserDTO)],
    isAuthenticated,
    isAccountHolder,
    async (req: Request, res: Response) => {
        const userID = +req.params.userID;
        const dto = req.body;

        const user: User = await userController.update(userID, dto);

        res.json(user);
    }
);

router.delete(
    "/:userID",
    [parseParam("userID", isInt)],
    isAuthenticated,
    isAccountHolder,
    async (req: Request, res: Response) => {
        const userID = +req.params.userID;

        await userController.remove(userID);

        res.json({ success: true });
    }
);

router.use(
    "/:userID/orders",
    parseParam("userID", isInt),
    isAuthenticated,
    isAccountHolder,
    orderRoutes
);

export default router;
