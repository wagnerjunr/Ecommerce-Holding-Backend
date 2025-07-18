import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products/european')
export class EuropeanProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @Get(':id')
  async getEuropeanProductById(@Param('id') id: string) {
    return this.productsService.getProductByIdEuropean(id);
  }
}