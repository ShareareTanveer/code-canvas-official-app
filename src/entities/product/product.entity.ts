import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsBoolean } from 'class-validator';
import { BaseEntity } from '../base/base.entity';
import { ProductImage } from './product-image.entity';
import { Tag } from '../tag/tag.entity';
import { ProductCategory } from './productCategory.entity';
import { PriceOption } from './priceOption.entity';

@Entity('product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductCategory, (category) => category.id, {
    nullable: false,
    onDelete: 'RESTRICT',
    
  })
  @JoinColumn()
  productCategory: ProductCategory;

  @Column({ length: 255, unique: true, nullable: false })
  title: string;

  @Column({ unique: true, nullable: false })
  slug: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ nullable: true })
  live_link: string;

  @OneToMany(() => PriceOption, (priceOption) => priceOption.product, {
    cascade: true,
  })
  priceOptions: PriceOption[];

  @Column({ type: 'text', nullable: true })
  subtitle?: string;

  @Column({ default: false })
  @IsBoolean()
  is_documented: boolean;

  @ManyToMany(() => Tag, (tag) => tag.products)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  images: ProductImage[];

  @Column({ type: 'text', nullable: false })
  featuredImage: string;

  @Column({ nullable: true })
  cloudinary_image_public_id: string;
}
