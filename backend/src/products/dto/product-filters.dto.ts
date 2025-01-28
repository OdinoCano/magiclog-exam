import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';

export class ProductFiltersDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiProperty({ example: 1000, required: false })
  @IsOptional()
  @IsNumber()
  @Max(1000000)
  maxPrice?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  sellerId?: number; // Para filtro de admin
}