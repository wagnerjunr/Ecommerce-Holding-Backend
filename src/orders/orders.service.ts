import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto, userId: string) {
    const { items, total, addressId } = createOrderDto;

    console.log(items)

    const order = await this.prisma.order.create({
      data: {
        userId: userId,
        addressId: addressId,
        total: new Decimal(total),
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: new Decimal(item.price),
          })),
        },
      },
      include: {
        items: true,
        address: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return order; 
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        items: true,
        address: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getOrderById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        address: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}