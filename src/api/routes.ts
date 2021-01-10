import { Request, Response, Router } from "express";
import userRoutes from "./components/user/user.routes";
import authRoutes from "./components/auth/auth.routes";
import productRoutes from "./components/product/product.routes";
import tagRoutes from "./components/tag/tag.routes";
import brandRoutes from "./components/brand/brand.routes";
import categoryRoutes from "./components/category/category.routes";
import orderRoutes from "./components/order/order.routes";
import { NotFoundException } from "../exceptions/NotFoundException";
import { isAuthenticated } from "./middleware/is-authenticated";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/tags", tagRoutes);
router.use("/brands", brandRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);
router.use("/orders", isAuthenticated, orderRoutes);

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
