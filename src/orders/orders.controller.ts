import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @User() userId: string, 
  ) {
    return this.ordersService.createOrder(createOrderDto, userId);
  }

  @Get()
  async getAllOrdersByUserId(@User() userId: string, ) {
    return this.ordersService.getAllOrdersByUserId(userId);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }
}