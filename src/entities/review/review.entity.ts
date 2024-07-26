import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  CreateDateColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { ERating } from '../../enum/rating.enum';

@Entity()
@Unique(['user', 'product'])
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'text', nullable: true })
  text?: string;

  @Column({ type: 'enum', enum: ERating })
  rating: ERating;

  @CreateDateColumn()
  createdAt: Date;
}
