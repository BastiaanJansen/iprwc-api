import { IsNotEmpty, IsNumber } from "class-validator";
import { DTO } from "../../../../../utils/DTO";

export class CreateShoppingCartItemDTO extends DTO {
    @IsNotEmpty()
    @IsNumber()
    productID: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
