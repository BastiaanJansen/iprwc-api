import { Router, Request, Response } from "express";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { Filter } from "../../../utils/filter";
import {
    parseBody,
    parseFilter,
    parseParam,
} from "../../../utils/validator/validator";
import * as brandController from "./brand.controller";
import { isInt } from "../../../utils/validator/is-int";
import { Brand } from "./brand.model";
import { UpdateBrandDTO } from "./dto/update-brand.dto";
import { CreateBrandDTO } from "./dto/create-brand.dto";
import { isAuthenticated } from "../../middleware/is-authenticated";
import { isAdmin } from "../../middleware/is-admin";
import { DeleteResult } from "typeorm";

const router: Router = Router();

router.get("/", [parseFilter(Filter)], async (req: Request, res: Response) => {
    const filter: Filter = req.filter;

    const tags: DBFindAllResponse<Brand[]> = await brandController.findAll(
        filter
    );

    res.json(tags);
});

router.get(
    "/:id",
    [parseParam("id", isInt)],
    async (req: Request, res: Response) => {
        const id = +req.params.id;

        const brand: Brand = await brandController.findByID(id);

        res.json(brand);
    }
);

router.post(
    "/",
    [parseBody(CreateBrandDTO)],
    isAuthenticated,
    isAdmin,
    async (req: Request, res: Response) => {
        const dto = req.body;

        const brand: Brand = await brandController.create(dto);

        res.json(brand);
    }
);

router.patch(
    "/:id",
    [parseParam("id", isInt), parseBody(UpdateBrandDTO)],
    isAuthenticated,
    isAdmin,
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const dto = req.body;

        const brand: Brand = await brandController.update(id, dto);

        res.json(brand);
    }
);

router.delete(
    "/:id",
    [parseParam("id", isInt)],
    isAuthenticated,
    isAdmin,
    async (req: Request, res: Response) => {
        const id = +req.params.id;

        await brandController.remove(id);

        res.json({ success: true });
    }
);

export default router;
