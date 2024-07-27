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
import { Category } from '../category/category.entity';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { BaseEntity } from '../base/base.entity';
import { ProductImage } from './product-image.entity';
import { Tag } from '../tag/tag.entity';
import { Review } from '../review/review.entity';
import { DecimalColumnTransformer } from '../../utilities/decimal-column-transformer.utility';

@Entity('product')
export class Product  {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: Category;

  @Column({ length: 255, unique: true, nullable: false })
  title: string;

  @Column({ unique: true, nullable: false })
  slug: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: true })
  live_link: string;

  @Column({ nullable: true })
  support_for: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false, transformer: new DecimalColumnTransformer()  })
  price: number;

  @Column({ default: false })
  @IsBoolean()
  is_documented: boolean;

  @ManyToMany(() => Tag, (tag) => tag.products)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];
  
  @Column({ nullable: true })
  @IsOptional()
  @IsNumber()
  total_sale?: number;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
 
//   @Column({ length: 255, nullable: true })
//   @IsOptional()
//   @IsNumber()
//   total_review?: number;

//   @Column('decimal', { precision: 1, scale: 1, nullable: false  })
//   @IsOptional()
//   @IsNumber()
//   avg_review?: number;
}
