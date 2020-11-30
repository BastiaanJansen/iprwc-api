import { Router, Request, Response } from "express";
import { DBFindAllResponse } from "../../../utils/db-find-all-response";
import { Filter } from "../../../utils/filter";
import {
    parseBody,
    parseFilter,
    parseParam,
} from "../../../utils/validator/validator";
import { Tag } from "./tag.model";
import * as tagController from "./tag.controller";
import { isInt } from "../../../utils/validator/is-int";
import { CreateTagDTO } from "./dto/create-tag.dto";
import { UpdateTagDTO } from "./dto/update-tag.dto";
import { isAuthenticated } from "../../middleware/is-authenticated";
import { isAdmin } from "../../middleware/is-admin";
const router: Router = Router();

router.get("/", [parseFilter(Filter)], async (req: Request, res: Response) => {
    const filter: Filter = req.filter;

    const tags: DBFindAllResponse<Tag[]> = await tagController.findAll(filter);

    res.json(tags);
});

router.get(
    "/:id",
    [parseParam("id", isInt)],
    async (req: Request, res: Response) => {
        const id = +req.params.id;

        const tag: Tag = await tagController.findByID(id);

        res.json(tag);
    }
);

router.post(
    "/",
    [parseBody(CreateTagDTO)],
    isAuthenticated,
    isAdmin,
    async (req: Request, res: Response) => {
        const dto = req.body;

        const tag: Tag = await tagController.create(dto);

        res.json(tag);
    }
);

router.patch(
    "/:id",
    [parseParam("id", isInt), parseBody(UpdateTagDTO)],
    isAuthenticated,
    isAdmin,
    async (req: Request, res: Response) => {
        const id = +req.params.id;
        const dto = req.body;

        const tag: Tag = await tagController.update(id, dto);

        res.json(tag);
    }
);

router.delete(
    "/:id",
    [parseParam("id", isInt)],
    isAuthenticated,
    isAdmin,
    async (req: Request, res: Response) => {
        const id = +req.params.id;

        await tagController.remove(id);

        res.status(200).send();
    }
);

export default router;
