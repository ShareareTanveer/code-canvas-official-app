import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString } from 'class-validator';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true})
  @IsString()
  name: string;

  @Column({ length: 100, nullable: true })
  @IsString()
  color: string;
  
  @Column({type: 'text', nullable: true })
  subtitle?: string;

  @Column({ type: "text", unique: true})
  @IsString()
  icon: string;

  @Column({ nullable: true })
  @IsString()
  image: string;

  @Column({ nullable: true })
  @IsString()
  cloudinary_image_public_id: string;
}
