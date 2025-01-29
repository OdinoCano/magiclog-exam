import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductRepository } from './repositories/product.repository';
import { ProductQueryService } from './services/product-query.service';
import { Product } from './products.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User]),
  ], // Registra la entidad Product
  controllers: [ProductsController],
  providers: [ProductRepository, ProductQueryService],
  exports: [ProductRepository],
})
export class ProductsModule {}