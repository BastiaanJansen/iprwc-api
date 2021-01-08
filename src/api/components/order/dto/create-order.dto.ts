import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { DTO } from "../../../../utils/DTO";
import { CreateOrderItemDTO } from "../order-item/dto/create-order-item.dto";

export class CreateOrderDTO extends DTO {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDTO)
    @ArrayMinSize(1)
    productItems: CreateOrderItemDTO[];
}