import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OurService } from './our-service.entity';

@Entity()
export class OurServiceImage {
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

  @ManyToOne(() => OurService, (service) => service.images, {
    onDelete: 'CASCADE',
  })
  service: OurService;
}
