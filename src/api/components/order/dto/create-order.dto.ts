import { IsArray } from "class-validator";
import { DTO } from "../../../../utils/DTO";

export class CreateOrderDTO extends DTO {
    @IsArray()
    productID: number[];
}