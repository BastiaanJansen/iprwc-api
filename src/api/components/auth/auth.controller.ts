require("dotenv").config();
import * as userDAO from "../user/user.dao";
import { LoginDTO } from "./dto/login.dto";
import { LoginInfo } from "./login-info.model";
import jsonwebtoken from "jsonwebtoken";
import { Exception } from "../../../exceptions/Exception";
import { HTTPStatus } from "../../../utils/http-status-codes";
import { UnauthorizedException } from "../../../exceptions/UnauthorizedException";
import { User } from "../user/user.model";

// export const login = async (loginDTO: LoginDTO): Promise<LoginInfo> => {
//     const { email, password } = loginDTO;
//     const employee: User = await userDAO.findByEmailWithPassword(email);

//     if (!employee) throw new UnauthorizedException("Login info incorrect");

//     const passwordIsCorrect: boolean = await employee.checkPassword(password);
//     delete employee.password;

//     if (!passwordIsCorrect)
//         throw new UnauthorizedException("Login info incorrect");

//     const privateKey = process.env.JWT_SECRET;
//     if (!privateKey) throw new Error("JWT secret must be defined");
//     const JWT = jsonwebtoken.sign({ employee }, privateKey);

//     return {
//         employee,
//         JWT,
//     };
// };
