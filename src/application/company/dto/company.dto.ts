import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CompanyType } from "../command/register-company.command";

export class CompanyDto {
    @IsNumber()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(CompanyType)
    type: CompanyType;

    @IsString()
    accessionDate: Date;
}