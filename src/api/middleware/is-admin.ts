import { Request, Response, NextFunction } from "express";
import { ForbiddenException } from "../../exceptions/ForbiddenException";
import { UnauthorizedException } from "../../exceptions/UnauthorizedException";
import { User } from "../components/user/user.model";

export const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user: User = req.user;

    if (!user) next(new UnauthorizedException());

    if (!user.admin) next(new ForbiddenException(`User is not an admin`));

    next();
};
