import { IsNotEmpty, IsNumber } from "class-validator";
import { DTO } from "../../../../../utils/DTO";

export class CreateOrderItemDTO extends DTO {
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    product: number;
}