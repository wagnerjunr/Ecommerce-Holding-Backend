import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUserById(id: string) {
    try {
      if (!id) {
        return null;
      }
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          email: true,
          name: true,
          id: true,
          orders: true,
        }
      });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
