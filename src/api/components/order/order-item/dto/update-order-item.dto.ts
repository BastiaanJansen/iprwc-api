import { IsNumber, IsOptional } from "class-validator";
import { DTO } from "../../../../../utils/DTO";

export class UpdateOrderItemDTO extends DTO {
    @IsOptional()
    @IsNumber()
    quantity?: number;
    
    @IsOptional()
    @IsNumber()
    product?: number;
}