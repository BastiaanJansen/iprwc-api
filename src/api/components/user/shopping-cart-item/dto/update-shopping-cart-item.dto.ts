import { IsNumber, IsOptional } from "class-validator";
import { DTO } from "../../../../../utils/DTO";

export class UpdateShoppingCartItemDTO extends DTO {
    @IsOptional()
    @IsNumber()
    quantity: number;
}
