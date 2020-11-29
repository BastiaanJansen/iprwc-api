import {
    ArrayUnique,
    IsArray,
    IsCurrency,
    IsDecimal,
    IsEAN,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    IsUrl,
    Length,
    ValidateNested,
} from "class-validator";
import { DTO } from "../../../../utils/DTO";
import { NutriScore } from "../product.model";

export class CreateProductDTO extends DTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsPositive()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    brandID: number;

    @IsNotEmpty()
    @IsEnum(NutriScore, {
        message: `nutriScore must be one of the following: ${Object.values(
            NutriScore
        ).join(", ")}`,
    })
    nutriScore: NutriScore;

    @IsNotEmpty()
    @IsString()
    weight: string;

    @IsNotEmpty()
    @IsNumber()
    categoryID: number;

    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @ArrayUnique()
    tagsID: number[];

    @IsNotEmpty()
    @IsUrl()
    image: string;

    @IsNotEmpty()
    @IsEAN()
    barcode: string;
}
