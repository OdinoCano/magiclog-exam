import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  // Agregar un producto al carrito
  async addToCart(user: User, productId: number, quantity: number): Promise<Cart> {
    const product = await this.cartRepository.manager
      .getRepository(Product)
      .findOne({ where: { id: productId } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const cartItem = this.cartRepository.create({
      //user,
      //product,
      quantity,
    });

    return this.cartRepository.save(cartItem);
  }

  // Obtener los productos del carrito
  //async getCart(user: User): Promise<Cart[]> {
  //  return this.cartRepository.find({
  //    where: { user: { id: user.id } },
  //    relations: ['product'],
  //  });
  //}
}