import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsNumber, IsString, Min, Max, ValidateIf, IsEmail } from 'class-validator';

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

  @ApiProperty({ required: false, description: 'Can be either seller ID (number) or email (string)' })
  @IsOptional()
  @Transform(({ value }) => {
    return !isNaN(+value) ? +value : value;
  })
  seller?: number | string;
}