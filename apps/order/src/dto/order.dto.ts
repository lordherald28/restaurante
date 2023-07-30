

import { IsNotEmpty, IsString/* , MinLength, IsMongoId, IsDate, IsDateString  */} from 'class-validator';

export class CreateOrderDto {

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()

  @IsString()
  client: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsString()
  restaurant: string;

}
