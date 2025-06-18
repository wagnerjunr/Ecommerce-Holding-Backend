import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products/brazilian')
export class BrazilianProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllBrazilianProducts() {
    return this.productsService.getAllBrazilianProducts();
  }

  @Get(':id')
  async getBrazilianProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
}