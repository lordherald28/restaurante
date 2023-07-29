
import { IsEmail, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class createClientDto {

    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    // @IsPhoneNumber('CU')
    @IsNumber()
    phone: string;

    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
    })
    @IsPositive({
        message: () => { return "La edad no es un numero valido" }
    })
    @Min(18)
    age: number;
}