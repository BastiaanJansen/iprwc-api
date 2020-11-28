import { Request, Response, Router } from "express";
import userRoutes from "./components/user/user.routes";
import authRoutes from "./components/auth/auth.routes";
import { isAuthenticated } from "./middleware/is-authenticated";
import { NotFoundException } from "../exceptions/NotFoundException";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/employees", userRoutes);

/**
 * Default root endpoint
 */
router.get("/", (req: Request, res: Response) => {
    res.json({
        success: true,
        result: {
            message: "Welcome to the webshop API",
        },
    });
});

/**
 * Not found route: show a 404 error response
 */
router.use("*", (req: Request, res: Response) => {
    throw new NotFoundException("Route not found");
});

export default router;
