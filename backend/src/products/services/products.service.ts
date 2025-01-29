import { Injectable } from "@nestjs/common";
import { Product } from "../products.entity";
import { User } from "src/users/users.entity";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductFiltersDto } from "../dto/product-filters.dto";
import { Logger } from "typeorm";
import { UpdateProductDto } from "../dto/update-product.dto";
import { ProductRepository } from "../repositories/product.repository";
import { IProductService } from "../interfaces/product-service.interface";

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto, user: User): Promise<Product> {
    return this.productRepository.create(createProductDto, user);
  }

  async findAll(filters: ProductFiltersDto, user: User): Promise<Product[]> {
    return this.productRepository.findAll(filters, user);
  }

  async findOne(id: number, user: User): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto, user: User): Promise<Product> {
    return this.productRepository.update(id, updateProductDto, user);
  }

  async remove(id: number, user: User): Promise<void> {
    return this.productRepository.remove(id, user);
  }
}