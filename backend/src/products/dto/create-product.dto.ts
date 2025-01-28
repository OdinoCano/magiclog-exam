import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min, IsPositive, Matches } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop', description: 'Nombre del producto' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'ABC-123', description: 'SKU del producto' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z]{3}-\d{3}$/, {
    message: 'El SKU debe tener el formato ABC-123',
  })
  sku: string;

  @ApiProperty({ example: 10, description: 'Cantidad disponible' })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: 1500, description: 'Precio del producto' })
  @IsNotEmpty()
  @IsPositive()
  price: number;
}