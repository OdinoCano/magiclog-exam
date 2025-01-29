import { AuthenticatedRequest } from "src/auth/interfaces/auth.interface";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { ProductFiltersDto } from "src/products/dto/product-filters.dto";
import { UpdateProductDto } from "src/products/dto/update-product.dto";
import { Product } from "src/products/products.entity";

export interface IProductController {
  create(createProductDto: CreateProductDto, request: AuthenticatedRequest): Promise<Product>;
  findAll(filters: ProductFiltersDto, request: AuthenticatedRequest): Promise<Product[]>;
  findOne(id: number, request: AuthenticatedRequest): Promise<Product>;
  update(id: number, updateProductDto: UpdateProductDto, request: AuthenticatedRequest): Promise<Product>;
  remove(id: number, request: AuthenticatedRequest): Promise<void>;
}