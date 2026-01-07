import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransferDto {
    @IsNumber()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    companyId: string;

    @IsNumber()
    amount: number;

    @IsString()
    date: Date;
}