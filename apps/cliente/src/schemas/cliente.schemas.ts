

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { type } from 'os';

export type IClienteDocument = ICliente & Document

@Schema({
    timestamps: true,
    versionKey: false,
})
export class ICliente {

    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop()
    email: string;

    @Prop()
    phone: number;
}

export const IClienteSchema = SchemaFactory.createForClass(ICliente);