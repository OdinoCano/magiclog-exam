import { User } from "src/users/users.entity";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductFiltersDto } from "../dto/product-filters.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { Product } from "../products.entity";

export interface IProductService {
  create(createProductDto: CreateProductDto, user: User): Promise<Product>;
  findAll(filters: ProductFiltersDto, user: User): Promise<Product[]>;
  findOne(id: number, user: User): Promise<Product>;
  update(id: number, updateProductDto: UpdateProductDto, user: User): Promise<Product>;
  remove(id: number, user: User): Promise<void>;
}