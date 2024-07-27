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
import { DecimalColumnTransformer } from '../../utilities/decimal-column-transformer.utility';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable()
  products: Product[];

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @Column('decimal', { precision: 10, scale: 2, nullable: true, transformer: new DecimalColumnTransformer() })
  totalPrice: number;
}
