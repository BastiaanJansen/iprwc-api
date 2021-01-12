import { IsOptional } from "class-validator";
import { Filter } from "../../../../../utils/filter";

export class FilterOrderItemDTO extends Filter {
    @IsOptional()
    orderID?: number;
}
