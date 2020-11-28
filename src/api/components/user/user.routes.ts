import { Router, Request, Response } from "express";
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

export default router;
