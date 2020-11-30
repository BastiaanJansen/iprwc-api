import {
    IsDefined,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from "class-validator";
import { DTO } from "../../../../utils/DTO";

export class CreateUserDTO extends DTO {
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
