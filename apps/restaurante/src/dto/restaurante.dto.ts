
import { IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class defineRestauranteDto {


    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsNumber({
        allowNaN: false,
        allowInfinity: false,
    })
    @IsPositive({
        message: () => { return "La capacidad no es un número valido" }
    })
    @Min(1)
    capacity: number;

}