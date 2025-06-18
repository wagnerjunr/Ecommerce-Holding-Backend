import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BrazilianProductsController } from './brazilian-products.controller';
import { EuropeanProductsController } from './european-products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [HttpModule],
  controllers: [BrazilianProductsController, EuropeanProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}