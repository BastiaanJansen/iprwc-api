import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../../exceptions/UnauthorizedException";
import jsonwebtoken from "jsonwebtoken";
import * as userDAO from "../components/user/user.dao";
import { User } from "../components/user/user.model";
import { BadRequestException } from "../../exceptions/BadRequestException";

/**
 * Added property employee to Express Request object
 */
declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}

interface DecodedToken {
    user: User;
    iat: number;
}

/**
 * Check if user is authenticated, if not, send an unauthorized response
 * @param req
 * @param res
 * @param next
 */
export async function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!(await authenticate(req, next))) {
        return next(new UnauthorizedException());
    }

    next();
}

/**
 * Check if JWT is present and valid, if so, add the employee object to the request
 * @param req
 */
export async function authenticate(
    req: Request,
    next: NextFunction
): Promise<Boolean | undefined> {
    try {
        const privateKey = process.env.JWT_SECRET;
        if (!privateKey) throw new Error("JWT secret must be defined");

        // Get JWT
        const token = getTokenFromRequest(req);

        // Check if JWT is valid
        let decodedToken: DecodedToken;
        try {
            decodedToken = jsonwebtoken.verify(
                token,
                privateKey
            ) as DecodedToken;
        } catch (error) {
            return false;
        }

        const userInToken: User = decodedToken.user;

        const user = await userDAO.findByID(userInToken.id);

        if (!user) throw new BadRequestException(`Authentication failed.`);

        // Add employee to request object
        req.user = user;

        return true;
    } catch (error) {
        next(error);
    }
}

/**
 * Check if user is authenticated, if true, add employee object to request. If not, do nothing
 * @param req
 * @param res
 * @param next
 */
export async function mayBeAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    await authenticate(req, next);
    next();
}

/**
 * Retrieve a Bearer JsonWebToken from request
 * @param req
 */
export function getTokenFromRequest(req: Request): string {
    if (!req.headers.authorization)
        throw new UnauthorizedException("Authorization header must be present");
    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new UnauthorizedException("Token must be a bearer token");
    return token;
}
