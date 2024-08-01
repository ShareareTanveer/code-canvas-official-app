import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100})
  @IsString()
  @IsNotEmpty()
  image: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  cloudinary_image_public_id: string;

  // @ManyToOne(() => Product, (product) => product.images, { cascade: true, onDelete: "CASCADE" })
  // @JoinColumn()
  // @IsNotEmpty()
  // product: Product;

  @ManyToOne(() => Product, (product) => product.images, { onDelete: 'CASCADE' })
  product: Product;
}
