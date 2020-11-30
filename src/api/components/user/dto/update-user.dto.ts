import { IsEmail, IsOptional, IsString } from "class-validator";
import { DTO } from "../../../../utils/DTO";

export class UpdateUserDTO extends DTO {
    @IsOptional()
    @IsString()
    firstname?: string;

    @IsOptional()
    @IsString()
    lastname?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    password?: string;
}
