import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../products.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { UpdateProductDto } from "../dto/update-product.dto";
import { CreateProductDto } from "../dto/create-product.dto";
import { ProductFiltersDto } from "../dto/product-filters.dto";
import { ProductQueryService } from "../services/product-query.service";
import { Role } from "src/auth/enums/role.enum";

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private readonly queryService: ProductQueryService
  ) {}

  async findAll(filters: ProductFiltersDto, user: User): Promise<Product[]> {
    const query = this.repository.createQueryBuilder('product');
    
    // Apply base query
    this.queryService.buildBaseQuery(query);

    if (!user) {
      return query.getMany();
    }

    // Apply role-based filters
    if (user.role === Role.Seller) {
      query.andWhere('seller.id = :sellerId', { sellerId: user.id });
    }

    // Apply filters
    this.queryService.applyFilters(query, filters);

    return query.getMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.repository.findOne({ 
      where: { id },
      relations: ['seller']
    });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  async create(createProductDto: CreateProductDto, user: User): Promise<Product> {
    const product = this.repository.create({
      ...createProductDto,
      sellerId: user.id,
      seller: user
    });

    return this.repository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto, user: User): Promise<Product> {
    const product = await this.findOne(id);

    if (user.role !== Role.Admin && product.sellerId !== user.id) {
      throw new ForbiddenException('No tienes permiso para actualizar este producto');
    }

    Object.assign(product, updateProductDto);
    return this.repository.save(product);
  }

  async remove(id: number, user: User): Promise<void> {
    const product = await this.findOne(id);

    if (user.role !== Role.Admin && product.sellerId !== user.id) {
      throw new ForbiddenException('No tienes permiso para eliminar este producto');
    }

    await this.repository.remove(product);
  }
}