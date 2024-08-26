import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { IsArray, IsString, IsBoolean } from 'class-validator';
import { BaseEntity } from '../base/base.entity';
import { BlogImage } from './blog-image.entity';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';

@Entity()
@Unique(['title'])
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ unique: true, nullable: false })
  slug: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @OneToMany(() => BlogImage, (image) => image.blog, {
    cascade: true,
  })
  images: BlogImage[];

  @Column('simple-array', { nullable: true })
  @IsArray()
  @IsString({ each: true })
  keyPoints: string[];

  @Column({ default: 0 })
  views: number;

  @Column({ default: false })
  @IsBoolean()
  isFeatured: boolean;

  @ManyToOne(() => Category, (category) => category.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: Category;
}
