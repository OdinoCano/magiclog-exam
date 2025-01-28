import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../products/products.entity';
import { Cart } from '../cart/cart.entity';
import { Role } from 'src/auth/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['seller', 'buyer', 'admin'], default: 'seller' })
  role: string;

  // Relación OneToMany con Product
  @OneToMany(() => Product, (product) => product.seller)
  products: Product[]; // Esta es la propiedad que estaba faltante
  
  @OneToMany(() => Cart, (cart) => cart.user)
  cartItems: Cart[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  roles: Role;
}