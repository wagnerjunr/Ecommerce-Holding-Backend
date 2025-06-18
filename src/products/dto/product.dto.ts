export interface ProductDto {
  id: string;
  externalId: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  material?: string;
  provider?: string;
  available?: boolean;
  discountValue?: number;
}