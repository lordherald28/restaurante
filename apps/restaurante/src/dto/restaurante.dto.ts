
import { createClientDto } from "apps/cliente/src/dto/cliente.dto";
import { IsEmail, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class defineRestauranteDto {

 
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
    })
    @IsPositive({
        message: () => { return "La capacidad no es un número valido" }
    })
    @Min(1)
    capacity: number;

    clients: createClientDto[]

}