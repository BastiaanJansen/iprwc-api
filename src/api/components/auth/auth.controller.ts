require("dotenv").config();
import * as userDAO from "../user/user.dao";
import { LoginDTO } from "./dto/login.dto";
import { LoginInfo } from "./login-info.model";
import jsonwebtoken from "jsonwebtoken";
import { UnauthorizedException } from "../../../exceptions/UnauthorizedException";
import { RegisterDTO } from "./dto/register.dto";
import { User } from "../user/user.model";
import { BadRequestException } from "../../../exceptions/BadRequestException";

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
    const jwt = jsonwebtoken.sign({ user }, privateKey);

    return {
        user,
        jwt,
    };
};

export const register = async (dto: RegisterDTO): Promise<User> => {
    const { firstname, lastname, email, password } = dto;
    
    const user = await userDAO.findByEmail(email);

    if (user) throw new BadRequestException("Email is already used");

    return await userDAO.create(dto);
}
