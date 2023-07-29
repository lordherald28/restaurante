

import { IsNotEmpty, IsString/* , MinLength, IsMongoId, IsDate, IsDateString  */} from 'class-validator';

export class CreateOrderDto {

  @IsNotEmpty()
  @IsString()
  // @MinLength(10)
  description: string;

  @IsNotEmpty()
  // @IsMongoId()
  @IsString()
  client: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  // @IsMongoId()
  @IsString()
  restaurant: string;

}
