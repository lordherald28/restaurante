import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICliente } from './schemas/cliente.schemas';
import { Model } from 'mongoose';
import { createClientDto } from './dto/cliente.dto';
import { updateClienteDto } from './dto/cliente.update.dto';
import { ConflictException } from '@nestjs/common';


@Injectable()
export class ClienteService {

  constructor(
    @InjectModel(ICliente.name) private clientModel: Model<ICliente>
  ) {

  }


  async create(cliente: createClientDto): Promise<ICliente | { error: string }> {
    try {
      const existingCliente = await this.clientModel.findOne({ $or: [{ name: cliente.name }, { email: cliente.email }, { phone: cliente.phone }] }).exec();
      if (existingCliente) {
        console.log('El nombre o el correo ya existen');
        return { error: 'El nombre o el correo ya existen' };
      }
      return await (new this.clientModel(cliente).save({ validateBeforeSave: true }));
    } catch (error) {
      // console.error(error);
      return { error: error.message };
    }
  }



  async findAll(): Promise<ICliente[]> {
    return await this.clientModel.find().exec();
  }

  async ListarEvento(): Promise<ICliente[]> {
    return await this.clientModel.find().exec();
  }

  async update(cliente: updateClienteDto): Promise<ICliente> {
    // console.log(cliente)
    const clienteUpdate = await this.clientModel.findByIdAndUpdate(cliente.id, cliente, { new: true }).exec();
    return clienteUpdate
    // return await this.clientModel.findByIdAndUpdate(cliente.id, cliente, { new: true }).exec();
  }

  async delete(id: string): Promise<ICliente> {
    return await this.clientModel.findByIdAndDelete(id).exec()
  }

  async findOne(id: string): Promise<ICliente> {
    return await this.clientModel.findById(id).exec()
  }
}
