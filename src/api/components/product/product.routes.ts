import { Router, Request, Response } from "express";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { Filter } from "../../../utils/filter";
import { isInt } from "../../../utils/validator/is-int";
import { parseFilter, parseParam } from "../../../utils/validator/validator";
import { FilterProductDTO } from "./dto/filter-product.dto";
import * as productController from "./product.controller";
import { Product } from "./product.model";

const router: Router = Router();

router.get(
    "/",
    [parseFilter(FilterProductDTO)],
    async (req: Request, res: Response) => {
        const filter: FilterProductDTO = req.filter;

        const products: DBFindAllResponse<
            Product[]
        > = await productController.findAll(filter);

        res.json(products);
    }
);

router.get(
    "/:id",
    [parseParam("id", isInt)],
    async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        const product: Product = await productController.findByID(id);

        res.json({
            result: product,
        });
    }
);

export default router;
