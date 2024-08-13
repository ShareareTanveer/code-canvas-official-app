import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products: Product[];

  @OneToOne(() => User, (user) => user.wishlist, {
    onDelete: 'RESTRICT',
  })
  user: User;
}
