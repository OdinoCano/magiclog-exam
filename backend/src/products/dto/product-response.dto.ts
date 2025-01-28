import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  sku: string;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Expose()
  sellerId: number; // Ocultar si es necesario
}