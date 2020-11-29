import { IsOptional, IsString } from "class-validator";
import { DTO } from "../../../../utils/DTO";

export class UpdateTagDTO extends DTO {
    @IsOptional()
    @IsString()
    name?: string;
}
