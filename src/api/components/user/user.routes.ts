import { Router, Request, Response } from "express";
import { isInt } from "../../../utils/validator/is-int";
import { parseBody, parseParam } from "../../../utils/validator/validator";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import * as userController from "./user.controller";
import { User, Role } from "./user.model";
// import { hasRole } from "../../middleware/has-role";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
    const users: User[] = await userController.findAll();

    res.json({
        success: true,
        result: users,
    });
});

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
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const dto = req.body;

        const user: User = await userController.update(id, dto);

        res.json({
            result: user,
        });
    }
);

export default router;
