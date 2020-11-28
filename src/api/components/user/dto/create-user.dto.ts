import { IsDefined, IsEmail, IsNotEmpty } from "class-validator";
import { DTO } from "../../../../utils/DTO";

export class CreateUserDTO extends DTO {
    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
