
import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './order.dto';
// import { IsOptional, IsString, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';


export class updateOrderDto extends PartialType(CreateOrderDto) {}
