import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { IsArray, IsString } from 'class-validator';
import { BaseEntity } from '../base/base.entity';
import { OurServiceImage } from './our-service-image.entity';
import { OurServiceFAQ } from './our-service-faq.entity';
import { DecimalColumnTransformer } from '../../utilities/decimal-column-transformer.utility';
import { Category } from '../category/category.entity';

@Entity()
export class OurService extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @ManyToOne(() => Category, (category) => category.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: Category;

  @Column({ nullable: false })
  subtitle: string;

  @Column({ length: 255, nullable: true })
  contentTitle: string;

  @Column({ nullable: true })
  content: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: new DecimalColumnTransformer(),
  })
  price: number;

  @Column({ nullable: false,})
  slug: string;

  @Column({ nullable: false })
  description: string;

  @OneToMany(() => OurServiceImage, (image) => image.service, {
    cascade: true,
  })
  images: OurServiceImage[];

  @OneToMany(() => OurServiceFAQ, (faq) => faq.service, {
    cascade: true,
    nullable: true,
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
