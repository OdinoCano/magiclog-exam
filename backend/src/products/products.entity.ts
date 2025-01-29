import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Cart } from '../cart/cart.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  sku: string;

  @Column()
  quantity: number;

  @Column('decimal')
  price: number;
  
  @Column({ nullable: false })
  sellerId: number;

  @ManyToOne(() => User, (user) => user.products, { nullable: false })
  @JoinColumn({ name: 'sellerId' })
  seller: User;
  //@OneToMany(() => Cart, (cart) => cart.product)
  //cartItems: Cart[];
}