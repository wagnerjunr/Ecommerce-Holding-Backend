export interface ProductDto {
  id: string;
  externalId: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category?: string;
  material?: string;
  department?: string;
  provider?: string;
  available?: boolean;
}