import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ProductDto } from './dto/product.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getAllProducts(): Promise<ProductDto[]> {
    try {
      const brazilianProducts = await this.getBrazilianProducts();
      const europeanProducts = await this.getEuropeanProducts();
      return [...brazilianProducts, ...europeanProducts];
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
        material: product.material,
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

  async getEuropeanProducts(): Promise<ProductDto[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider'
        )
      );

      return response.data.map((product: any) => ({
        id: product.id,
        externalId: product.id,
        name: product.name,
        material: product.details.material,
        price: parseFloat(product.price),
        description: product.description,
        image: product.gallery[0],
        provider: 'european',
        available: true,
        discountValue: product.discountValue,
      }));
    } catch (error) {
      this.logger.error('Erro ao buscar produtos europeus:', error);
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
        material: response.data.material,
      };
    } catch (error) {
      this.logger.error('Erro ao buscar produto:', error);
      return null;
    }
  }

  async getProductByIdEuropean(id: string): Promise<ProductDto | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/${id}`
        )
      );
      return {
        id: response.data.id,
        externalId: response.data.id,
        name: response.data.name,
        price: parseFloat(response.data.price),
        description: response.data.description,
        image: response.data.gallery[0],
        provider: 'european',
        available: true,
        discountValue: response.data.discountValue,
        material: response.data.details.material,
      };
    } catch (error) {
      this.logger.error('Erro ao buscar produto:', error);
      return null;
    }
  }
}