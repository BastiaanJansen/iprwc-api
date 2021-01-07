import { IsArray } from "class-validator";
import { DTO } from "../../../../utils/DTO";

export class UpdateOrderDTO extends DTO {
    @IsArray()
    productID: number[];
}