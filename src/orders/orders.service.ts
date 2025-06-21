import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto, userId: string) {
    const { items, total, addressId } = createOrderDto;

    console.log(items);

    if (addressId) {
      const address = await this.prisma.address.findFirst({
        where: {
          id: addressId,
          userId: userId,
        },
      });

      if (!address) {
        throw new Error(`Address with id ${addressId} not found or doesn't belong to user`);
      }
    }

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
            description: item.description,
            image: item.image,
            name: item.name,
            discountValue: item.discountValue ? new Decimal(item.discountValue) : null,
            provider: item.provider,
            id: crypto.randomUUID(),
            material: item.material,
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

  async getAllOrdersByUserId(userId: string) {
    const orders = this.prisma.order.findMany({
      where: { userId },
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
    return orders;
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