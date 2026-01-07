import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum CompanyType {
    PYME = 'PYME',
    COPORATE = 'COPORATE',
}

export class RegisterCompanyCommand {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Stefanini Group'})
    name: string;

    @IsEnum(CompanyType)
    @ApiProperty({ enum: CompanyType, example: CompanyType.PYME })
    type: CompanyType;
}