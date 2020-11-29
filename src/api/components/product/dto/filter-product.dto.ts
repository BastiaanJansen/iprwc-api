import { IsOptional } from "class-validator";
import { Filter } from "../../../../utils/filter";
import { NutriScore } from "../product.model";

export class FilterProductDTO extends Filter {
    @IsOptional() nutriScore?: NutriScore;
    @IsOptional() barcode?: string;
    @IsOptional() category?: number;
    @IsOptional() brand?: number;
    @IsOptional() tags?: string;
}
