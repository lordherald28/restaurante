import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ICliente, IClienteSchema } from './schemas/cliente.schemas';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/cliente'),
    MongooseModule.forFeature([{
      name: ICliente.name,
      schema: IClienteSchema
    }]),
  ],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule { }
