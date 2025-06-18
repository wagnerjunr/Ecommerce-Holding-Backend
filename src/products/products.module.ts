import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BrazilianProductsController } from './brazilian-products.controller';
import { EuropeanProductsController } from './european-products.controller';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController,BrazilianProductsController, EuropeanProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}