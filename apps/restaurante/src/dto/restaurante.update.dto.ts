
import { PartialType } from '@nestjs/mapped-types';
import { defineRestauranteDto } from './restaurante.dto';

export class updateRestauranteDto extends PartialType(defineRestauranteDto) { }
