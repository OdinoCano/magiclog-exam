import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { User } from '../users/users.entity';
import { ProductFiltersDto } from './dto/product-filters.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // Crear producto (solo vendedores)
  async create(createProductDto: CreateProductDto, seller: User): Promise<Product> {
    if (!seller) {
      throw new ForbiddenException('Usuario no autenticado');
    }
  
    // Validar que todos los campos estén presentes
    const requiredFields = ['name', 'sku', 'quantity', 'price'];
    const missingFields = requiredFields.filter((field) => {
      const fieldValue = createProductDto[field];
      return !(field in createProductDto) || fieldValue === undefined || fieldValue === '';
    });

    // Validar que 'name' y 'sku' no sean vacíos
    if (createProductDto.name === '' || createProductDto.sku === '') {
      missingFields.push('name or sku cannot be empty');
    }
  
    // Validar que 'quantity' y 'price' sean números mayores o iguales a 0
    if (createProductDto.quantity < 0) {
      missingFields.push('quantity must be greater than or equal to 0');
    }

    if (createProductDto.price < 0) {
      missingFields.push('price must be greater than or equal to 0');
    }

    if (missingFields.length > 0) {
      throw new BadRequestException(`Faltan los siguientes campos: ${missingFields.join(', ')}`);
    }
  
    try {
      // Crear producto
      const product = this.productsRepository.create({
        ...createProductDto,
        seller, // Asocia automáticamente al vendedor autenticado
      });
      
      return await this.productsRepository.save(product);
    } catch (error) {
      // Manejar errores únicos de base de datos (por ejemplo, el SKU ya existe)
      if (error.code === '23505') {
        throw new ForbiddenException('El SKU ya existe');
      }
      throw error;
    }
  }


  // Obtener productos (según rol)
  async findAll(user: User, filters: ProductFiltersDto): Promise<Product[]> {
    const query = this.buildBaseQuery(filters);
  
    // Filtros específicos por rol
    if (user.role === 'seller') {
      query.andWhere('product.sellerId = :sellerId', { sellerId: user.id });
    } else if (user.role === 'admin' && filters?.sellerId) {
      query.andWhere('product.sellerId = :sellerId', { sellerId: filters.sellerId });
    }
  
    return query.getMany();
  }

  async findAllPublic(filters: ProductFiltersDto): Promise<Product[]> {
    const query = this.buildBaseQuery(filters);
    return query.getMany();
  }

  // Búsqueda pública de productos
  async searchProducts(
    search?: string,
    minPrice?: number,
    maxPrice?: number,
    sellerId?: number,
  ): Promise<Product[]> {
    const query = this.productsRepository.createQueryBuilder('product');

    if (search) {
      query.where(
        '(product.name LIKE :search OR product.sku LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      query.andWhere('product.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      });
    } else if (minPrice !== undefined) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    } else if (maxPrice !== undefined) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    return query.getMany();
  }

  private buildBaseQuery(filters: ProductFiltersDto) {
    const query = this.productsRepository.createQueryBuilder('product');
  
    if (filters?.name) {
      query.andWhere('product.name LIKE :name', { name: `%${filters.name}%` });
    }
  
    if (filters?.sku) {
      query.andWhere('product.sku LIKE :sku', { sku: `%${filters.sku}%` });
    }
  
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      query.andWhere('product.price BETWEEN :minPrice AND :maxPrice', {
        minPrice: filters.minPrice || 0,
        maxPrice: filters.maxPrice || Number.MAX_SAFE_INTEGER,
      });
    }
  
    return query;
  }
}