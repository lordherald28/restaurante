
import { IsEmail, IsNumber, IsPhoneNumber, IsPositive, IsString, MaxLength, Min } from "class-validator";

export class ClientCreate {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('CU')
    phone: string;

    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
    })
    @IsPositive({
        message: () => {return "La edad no es un numero valido"}
    })
    @MaxLength(2)
    @Min(18)
    age: number;
}