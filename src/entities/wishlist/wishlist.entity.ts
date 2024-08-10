import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  Column,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from '../product/product.entity';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products: Product[];

  @OneToOne(() => User, (user) => user.wishlist, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  user?: User;
}
