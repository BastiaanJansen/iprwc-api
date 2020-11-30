import { IsNotEmpty, IsString } from "class-validator";
import { DTO } from "../../../../utils/DTO";

export class CreateCategoryDTO extends DTO {
    @IsNotEmpty()
    @IsString()
    name: string;
}
