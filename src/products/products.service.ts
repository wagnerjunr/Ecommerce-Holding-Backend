import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../database/prisma.service';
import { ProductDto } from './dto/product.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getAllProducts(): Promise<ProductDto[]> {
    try {
      const brazilianProducts = await this.getBrazilianProducts();
      return brazilianProducts;
    } catch (error) {
      this.logger.error('Erro ao buscar produtos:', error);
      return [];
    }
  }

  async getBrazilianProducts(): Promise<ProductDto[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider'
        )
      );

      return response.data.map((product: any) => ({
        id: product.id,
        externalId: product.id,
        name: product.nome,
        category: product.categoria,
        material: product.material,
        department: product.departamento,
        price: parseFloat(product.preco),
        description: product.descricao,
        image: product.imagem,
        provider: 'brazilian',
        available: true,
      }));
    } catch (error) {
      this.logger.error('Erro ao buscar produtos brasileiros:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<ProductDto | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/${id}`
        )
      );
      return {
        id: response.data.id,
        externalId: response.data.id,
        name: response.data.nome,
        price: parseFloat(response.data.preco),
        description: response.data.descricao,
        image: response.data.imagem,
        provider: 'brazilian',
        available: true,
      };
    } catch (error) {
      this.logger.error('Erro ao buscar produto:', error);
      return null;
    }
  }
}