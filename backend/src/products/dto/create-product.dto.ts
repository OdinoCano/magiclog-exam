import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min, Matches, IsNumber } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ABC-123', description: 'SKU del producto' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z]{3}-\d{3}$/, {
    message: 'El SKU debe tener el formato ABC-123',
  })
  sku: string;

  @ApiProperty({ example: 10, description: 'Cantidad disponible' })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: 1500, description: 'Precio del producto' })
  @IsNumber()
  @Min(0)
  price: number;
}