
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
        message: () => { return "La edad no es un número valido" }
    })
    @Min(18,{message:'Debes ser mayor de edad, edad mínima permitida es 18 años'})
    age: number;
}

export class restauranteClientsDto {

}