import { IsEmail, isEmail, IsNotEmpty, IsString } from "class-validator";
import { DTO } from "../../../../utils/DTO";

export class RegisterDTO extends DTO {
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