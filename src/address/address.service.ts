import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async createAddress(createAddressDto: CreateAddressDto, userId: string) {
    const address = await this.prisma.address.create({
      data: {
        ...createAddressDto,
        userId,
      },
    });
    return address;
  }

  async getAddressesByUserId(userId: string) {

    const address = await this.prisma.address.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(address);

    return address;
  }

  async getAddressById(id: string, userId: string) {
    return this.prisma.address.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

}