import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import {
  IsArray,
  IsString,
} from 'class-validator';
import { BaseEntity } from '../base/base.entity';
import { OurServiceImage } from './our-service-image.entity';
import { OurServiceFAQ } from './our-service-faq.entity';

@Entity()
export class OurService extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  title: string;

  @Column({ nullable: false })
  subtitle: string;

  @Column({ unique: true, nullable: false })
  slug: string;

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => OurServiceImage, (image) => image.service, {
    cascade: true,
    
  })
  images: OurServiceImage[];

  @OneToMany(() => OurServiceFAQ, (faq) => faq.service, {
    cascade: true,
    nullable: true
  })
  faqs: OurServiceFAQ[];

  @Column({ nullable: true, default: null })
  @IsString()
  icon?: string;

  @Column('simple-array', { nullable: true })
  @IsArray()
  @IsString({ each: true })
  keyPoints: string[];
}
