require("dotenv").config();
import * as userDAO from "../user/user.dao";
import { LoginDTO } from "./dto/login.dto";
import { LoginInfo } from "./login-info.model";
import jsonwebtoken from "jsonwebtoken";
import { Exception } from "../../../exceptions/Exception";
import { HTTPStatus } from "../../../utils/http-status-codes";
import { UnauthorizedException } from "../../../exceptions/UnauthorizedException";
import { User } from "../user/user.model";

export const login = async (loginDTO: LoginDTO): Promise<LoginInfo> => {
    const { email, password } = loginDTO;
    const user = await userDAO.findByEmail(email, true);

    if (!user) throw new UnauthorizedException("Login info incorrect");

    const passwordIsCorrect: boolean = await user.checkPassword(password);
    delete user.password;

    if (!passwordIsCorrect)
        throw new UnauthorizedException("Login info incorrect");

    const privateKey = process.env.JWT_SECRET;
    if (!privateKey) throw new Error("JWT secret must be defined");
    const JWT = jsonwebtoken.sign({ user }, privateKey);

    return {
        user,
        JWT,
    };
};
