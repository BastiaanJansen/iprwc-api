import * as userDAO from "./user.dao";
import { User } from "./user.model";
export const findAll = async (): Promise<User[]> => {
    const employees = await userDAO.findAll();
    return employees;
};
