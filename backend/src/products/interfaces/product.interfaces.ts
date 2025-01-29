import { User } from "src/users/users.entity";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductFiltersDto } from "../dto/product-filters.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../products.entity";
import { SelectQueryBuilder } from "typeorm";

export interface IProductReader {
  findAll(filters: ProductFiltersDto): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  findByUser(userId: number): Promise<Product[]>;
}

export interface IProductWriter {
  create(createProductDto: CreateProductDto, seller: User): Promise<Product>;
  update(id: number, updateProductDto: UpdateProductDto, user: User): Promise<Product>;
  delete(id: number, user: User): Promise<void>;
}

export interface IProductValidator {
  validateCreateProduct(product: CreateProductDto): void;
  validateUpdateProduct(product: UpdateProductDto): void;
}

export interface IProductRepository {
  findAll(query: SelectQueryBuilder<Product>): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  create(product: Product): Promise<Product>;
  update(id: number, product: Partial<Product>): Promise<Product>;
  delete(id: number): Promise<void>;
}

export interface IProductRepository {
  findAll(filters: ProductFiltersDto, user: User): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  create(createProductDto: CreateProductDto, seller: User): Promise<Product>;
  update(id: number, updateProductDto: UpdateProductDto, user: User): Promise<Product>;
  delete(id: number, user: User): Promise<void>;
}