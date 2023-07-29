import { Module } from '@nestjs/common';
import { RestauranteController } from './restaurante.controller';
import { RestauranteService } from './restaurante.service';

import { MongooseModule } from '@nestjs/mongoose';
import { IRestaurante, IRestauranteSchema } from './schema/restaurante.schemas';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/restaurante'),
    MongooseModule.forFeature([{
      name: IRestaurante.name,
      schema: IRestauranteSchema
    }]),
  ],
  controllers: [RestauranteController],
  providers: [RestauranteService],
})
export class RestauranteModule { }
