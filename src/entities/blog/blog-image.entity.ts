import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Blog } from './blog.entity';

@Entity()
export class BlogImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsString()
  @IsNotEmpty()
  image: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  cloudinary_image_public_id: string;

  @ManyToOne(() => Blog, (blog) => blog.images, {
    onDelete: 'CASCADE',
  })
  blog: Blog;
}
