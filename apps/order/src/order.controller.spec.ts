import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto';
import { IOrder } from './schema/order.schema';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;
  let orderModel: any;

  beforeEach(async () => {
    orderModel = {
      find: jest.fn(),
      save: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getModelToken('Order'),
          useValue: orderModel,
        },
      ],
    }).compile();

    orderController = app.get<OrderController>(OrderController);
    orderService = app.get<OrderService>(OrderService);
  });

  describe('create', () => {
    it('should create an order', async () => {
      const order: CreateOrderDto = {
        description: "Carne de cerdo",
        client: "64c444c8bc7dff1963fd8970",
        restaurant: "64c53c71967766f9dee67595",
        date: "2023-07-29T00:00:00.000Z"
      };

      const createdOrder: IOrder = {
        description: order.description,
        client: order.client as any, //Es una referencia a un documento de Cliente
        restaurant: order.restaurant as any, //Es una referencia a un documento de Restaurante
        date: new Date(order.date),
      };

      orderModel.find.mockResolvedValue([]); // esto asume que no se encontró ninguna orden
      orderModel.save.mockResolvedValue(createdOrder);

      expect(await orderController.create(order)).toEqual(createdOrder);
    });

    it('should throw an error', async () => {
      const order: CreateOrderDto = {
        description: "Carne de cerdo",
        client: "64c444c8bc7dff1963fd8970",
        restaurant: "64c53c71967766f9dee67595",
        date: "2023-07-29T00:00:00.000Z"
      };

      orderModel.find.mockResolvedValue([]); // Se asume que no se encontró ninguna orden
      orderModel.save.mockRejectedValue(new Error('Error al crear el pedido u orden.')); // Se  simula un error al guardar el pedido

      const result = await orderController.create(order);

      expect(result).toEqual('Otro error');
    });
  });
});
