import * as authController from "./auth.controller";
import { Router, Request, Response, NextFunction } from "express";
import { LoginDTO } from "./dto/login.dto";
import { LoginInfo } from "./login-info.model";
import { parseBody } from "../../../utils/validator/validator";
import { RegisterDTO } from "./dto/register.dto";
import { User } from "../user/user.model";

const router: Router = Router();

router.post(
    "/login",
    [parseBody(LoginDTO)],
    async (req: Request, res: Response) => {
        const loginDTO = req.body;

        const loginInfo: LoginInfo = await authController.login(loginDTO);

        res.json(loginInfo);
    }
);

router.post("/register",
    [parseBody(RegisterDTO)],
    async (req: Request, res: Response) => {
        const dto = req.body;

        const user: User = await authController.register(dto);

        res.json(user)
    }
)

export default router;
