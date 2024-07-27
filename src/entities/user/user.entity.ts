import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IsStrongPassword } from 'class-validator';
import { BaseEntity } from '../base/base.entity';
import { UserDetail } from './userDetails.entity';
import { Role } from './role.entity';
import { Review } from '../review/review.entity';
import { Cart } from '../cart/cart.entity';
import { Order } from '../order/order.entity';

@Entity('user', { orderBy: { id: 'DESC' } })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ length: 100, nullable: false })
  @Unique(['email'])
  email: string;

  @Column({ length: 100, nullable: false, select: false })
  @IsStrongPassword()
  password: string;

  @Column({ length: 255, nullable: true })
  firstName: string;

  @Column({ length: 255, nullable: true })
  lastName: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;

  @OneToOne(() => UserDetail, (userDetail) => userDetail.user, {
    eager: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  details: UserDetail;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  @JoinColumn()
  cart: Cart;
  
  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  @JoinColumn()
  orders: Order[];
}
