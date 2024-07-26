import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  @IsString()
  @IsNotEmpty()
  image: string;

  // @ManyToOne(() => Product, (product) => product.images, { cascade: true, onDelete: "CASCADE" })
  // @JoinColumn()
  // @IsNotEmpty()
  // product: Product;

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  product: Product;
}
