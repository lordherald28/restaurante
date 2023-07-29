
import { PartialType } from '@nestjs/mapped-types';
import { defineRestauranteDto } from './restaurante.dto';
// import { IsOptional, IsString, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';


export class updateRestauranteDto extends PartialType(defineRestauranteDto) { }
