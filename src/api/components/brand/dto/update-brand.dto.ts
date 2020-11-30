import { IsOptional, IsString } from "class-validator";
import { DTO } from "../../../../utils/DTO";

export class UpdateBrandDTO extends DTO {
    @IsOptional()
    @IsString()
    name?: string;
}
