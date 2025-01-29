import { BadRequestException, Injectable } from "@nestjs/common";
import { IProductValidator } from "../interfaces/product.interfaces";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";

@Injectable()
export class ProductValidatorService implements IProductValidator {
  private readonly requiredFields = ['name', 'sku', 'quantity', 'price'] as const;

  validateCreateProduct(dto: CreateProductDto): void {
    const errors: string[] = [];

    this.requiredFields.forEach(field => {
      if (!dto[field] && dto[field] !== 0) {
        errors.push(`${field} is required`);
      }
    });

    if (dto.name?.trim() === '' || dto.sku?.trim() === '') {
      errors.push('name and sku cannot be empty');
    }

    if (dto.quantity < 0) errors.push('quantity must be greater than or equal to 0');
    if (dto.price < 0) errors.push('price must be greater than or equal to 0');

    if (errors.length > 0) {
      throw new BadRequestException(errors.join(', '));
    }
  }

  validateUpdateProduct(dto: UpdateProductDto): void {
    // Similar validation logic for updates
  }
}