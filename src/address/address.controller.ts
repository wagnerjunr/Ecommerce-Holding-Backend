import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { User } from '../auth/decorators/user.decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createAddressDto: CreateAddressDto, @User() userId: string) {
    const address = this.addressService.createAddress(createAddressDto, userId);
    console.log(address);
    return address
  }

  @Get()
  findAll(@User() userId: string) {
    return this.addressService.getAddressesByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() userId: string) {
    return this.addressService.getAddressById(id, userId);
  }

}