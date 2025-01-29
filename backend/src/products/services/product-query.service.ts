import { SelectQueryBuilder } from "typeorm";
import { Product } from "../products.entity";
import { ProductFiltersDto } from "../dto/product-filters.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductQueryService {
  buildBaseQuery(queryBuilder: SelectQueryBuilder<Product>): SelectQueryBuilder<Product> {
    return queryBuilder
      .leftJoinAndSelect('product.seller', 'seller')
      .select([
        'product.id',
        'product.name',
        'product.sku',
        'product.quantity',
        'product.price',
        'product.sellerId',
        'seller.id',
        'seller.email'
      ]);
  }

  applyFilters(
    query: SelectQueryBuilder<Product>, 
    filters: ProductFiltersDto
  ): SelectQueryBuilder<Product> {
    if (filters.name) {
      query.andWhere('LOWER(product.name) LIKE LOWER(:name)', { 
        name: `%${filters.name}%` 
      });
    }

    if (filters.sku) {
      query.andWhere('LOWER(product.sku) LIKE LOWER(:sku)', { 
        sku: `%${filters.sku}%` 
      });
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      query.andWhere('product.price BETWEEN :minPrice AND :maxPrice', {
        minPrice: filters.minPrice ?? 0,
        maxPrice: filters.maxPrice ?? Number.MAX_SAFE_INTEGER,
      });
    }

    return query;
  }
}