import { IsNotEmpty, IsString } from "class-validator";
import { DTO } from "../../../../utils/DTO";

export class CreateTagDTO extends DTO {
    @IsNotEmpty()
    @IsString()
    name: string;
}
