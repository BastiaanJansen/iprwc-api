import { IsOptional } from "class-validator";
import { Filter } from "../../../../utils/filter";

export class FilterOrderDTO extends Filter {
    @IsOptional()
    user?: number;
}
