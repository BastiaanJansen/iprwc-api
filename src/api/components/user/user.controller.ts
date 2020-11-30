import { BadRequestException } from "../../../exceptions/BadRequestException";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import * as userDAO from "./user.dao";
import { User } from "./user.model";

export const findAll = async (): Promise<User[]> => {
    return await userDAO.findAll();
};

export const create = async (dto: CreateUserDTO): Promise<User> => {
    const userWithSameEmail = await userDAO.findByEmail(dto.email);

    if (userWithSameEmail)
        throw new BadRequestException("User with email already exists");

    return await userDAO.create(dto);
};

export const update = async (id: number, dto: UpdateUserDTO): Promise<User> => {
    if (dto.email) {
        const userWithSameEmail = await userDAO.findByEmail(dto.email);

        if (userWithSameEmail)
            throw new BadRequestException("User with email already exists");
    }

    return await userDAO.update(id, dto);
};
