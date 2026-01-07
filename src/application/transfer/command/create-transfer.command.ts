import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, isString } from "class-validator";
import { randomUUID } from "crypto";

export class CreateTransferCommand {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 500000 })
    amount: number

    @ApiProperty({ example: randomUUID() })
    @IsString()
    company_id: string;
}