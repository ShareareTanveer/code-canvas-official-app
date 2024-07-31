import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { GenericPageSectionItem } from './generic-page-section-item.entity';

@Entity()
export class GenericPageSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false  })
  @IsString()
  sectionName: string;

  @Column({ length: 255, unique: true, nullable: false  })
  @IsString()
  title: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  subtitle: string;

  @Column({ length: 255, nullable: true })
  @IsString()
  description: string;

  @Column({ nullable: true, default: null })
  @IsString()
  icon: string;

  @Column({ nullable: true, default: null })
  @IsString()
  image: string;
  
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  cloudinary_image_public_id: string;

  @Column('simple-array', { nullable: true })
  @IsArray()
  @IsString({ each: true })
  keyPoints: string[];

  @OneToMany(
    () => GenericPageSectionItem,
    (genericPageSectionItem) =>
      genericPageSectionItem.genericPageSection,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  items: GenericPageSectionItem[];
}
