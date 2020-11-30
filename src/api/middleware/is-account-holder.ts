import { Request, Response, NextFunction } from "express";
import { ForbiddenException } from "../../exceptions/ForbiddenException";
import { UnauthorizedException } from "../../exceptions/UnauthorizedException";
import { User } from "../components/user/user.model";

export const isAccountHolder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user: User = req.user;

    if (!user) next(new UnauthorizedException());

    if (user.id !== +req.params.id)
        next(new ForbiddenException(`You are not account holder`));

    next();
};
