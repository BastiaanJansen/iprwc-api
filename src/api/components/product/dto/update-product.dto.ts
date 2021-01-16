import {
    ArrayUnique,
    IsDecimal,
    IsEAN,
    IsEnum,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUrl,
} from "class-validator";
import { HasExtension } from "../../../../utils/decorators/has-extension.decorator";
import { DTO } from "../../../../utils/DTO";
import { NutriScore } from "../product.model";

export class UpdateProductDTO extends DTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    // @IsDecimal({ decimal_digits: "2" })
    @IsPositive()
    price?: number;

    @IsOptional()
    @IsNumber()
    brandID?: number;

    @IsOptional()
    @IsEnum(NutriScore, {
        message: `nutriScore must be one of the following: ${Object.values(
            NutriScore
        ).join(", ")}`,
    })
    nutriScore?: NutriScore;

    @IsOptional()
    @IsString()
    weight?: string;

    @IsOptional()
    @IsNumber()
    categoryID?: number;

    @IsOptional()
    @IsNumber({}, { each: true })
    @ArrayUnique()
    tagsID?: number[];

    @IsOptional()
    @IsUrl()
    @HasExtension(["png", "jpg", "jpeg"])
    image?: string;

    @IsOptional()
    @IsEAN()
    barcode?: string;
}
