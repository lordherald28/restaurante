
import { PartialType } from '@nestjs/mapped-types';
import { createClientDto } from './cliente.dto';
// import { IsOptional, IsString, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';


export class updateClienteDto extends PartialType(createClientDto) {}
