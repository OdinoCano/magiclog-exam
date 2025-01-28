import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]), // Registra la entidad Cart
    AuthModule,
    UsersModule, // Importa UsersModule
    ProductsModule, // Importa ProductsModule
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}