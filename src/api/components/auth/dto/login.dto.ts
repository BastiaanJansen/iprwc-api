import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { DTO } from "../../../../utils/DTO";

export class LoginDTO extends DTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
