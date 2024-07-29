import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { OurService } from './our-service.entity';

@Entity()
export class OurServiceImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ManyToOne(() => OurService, (service) => service.images, {
    onDelete: 'CASCADE',
  })
  service: OurService;
}
