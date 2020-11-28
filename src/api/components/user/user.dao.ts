import { getRepository } from "typeorm";
import { User } from "./user.model";

export const findAll = async (): Promise<User[]> => {
    return await getRepository(User).find();
};
