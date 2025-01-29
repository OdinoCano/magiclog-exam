import { CreateProductDto } from "src/products/dto/create-product.dto";
import { ProductFiltersDto } from "src/products/dto/product-filters.dto";
import { UpdateProductDto } from "src/products/dto/update-product.dto";
import { Product } from "src/products/products.entity";
import { User } from "src/users/users.entity";

export interface IProductRepository {
  findAll(filters: ProductFiltersDto, user: User): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  findOne(id: number): Promise<Product>;
  create(product: CreateProductDto, seller: User): Promise<Product>;
  update(id: number, product: UpdateProductDto, user: User): Promise<Product>;
  remove(id: number): Promise<void>;
}