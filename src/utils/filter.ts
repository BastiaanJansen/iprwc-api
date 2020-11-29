import { IsEnum, IsIn, IsOptional } from "class-validator";
import { DTO } from "./DTO";

export enum OrderDirection {
    ASC = "ASC",
    DESC = "DESC",
}

/**
 * Base filter class
 */
export class Filter extends DTO {
    @IsOptional() skip?: number;
    @IsOptional() take?: number;
    @IsOptional() order?: string;
    @IsOptional() @IsEnum(OrderDirection) orderDirection?: OrderDirection;
}
