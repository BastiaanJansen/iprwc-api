import { Router, Request, Response } from "express";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { Filter } from "../../../utils/filter";
import {
    parseBody,
    parseFilter,
    parseParam,
} from "../../../utils/validator/validator";
import * as categoryController from "./category.controller";
import { isInt } from "../../../utils/validator/is-int";
import { Category } from "./category.model";
import { UpdateCategoryDTO } from "./dto/update-category.dto";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { isAuthenticated } from "../../middleware/is-authenticated";
import { isAdmin } from "../../middleware/is-admin";

const router: Router = Router();

router.get("/", [parseFilter(Filter)], async (req: Request, res: Response) => {
    const filter: Filter = req.filter;

    const category: DBFindAllResponse<
        Category[]
    > = await categoryController.findAll(filter);

    res.json(category);
});

router.get(
    "/:id",
    [parseParam("id", isInt)],
    async (req: Request, res: Response) => {
        const id = +req.params.id;

        const category: Category = await categoryController.findByID(id);

        res.json(category);
    }
);

router.post(
    "/",
    [parseBody(CreateCategoryDTO)],
    isAuthenticated,
    isAdmin,
    async (req: Request, res: Response) => {
        const dto = req.body;

        const category: Category = await categoryController.create(dto);

        res.json(category);
    }
);

router.patch(
    "/:id",
    [parseParam("id", isInt), parseBody(UpdateCategoryDTO)],
    isAuthenticated,
    isAdmin,
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const dto = req.body;

        const category: Category = await categoryController.update(id, dto);

        res.json(category);
    }
);

router.delete(
    "/:id",
    [parseParam("id", isInt)],
    isAuthenticated,
    isAdmin,
    async (req: Request, res: Response) => {
        const id = +req.params.id;

        await categoryController.remove(id);

        res.status(200).send();
    }
);

export default router;
