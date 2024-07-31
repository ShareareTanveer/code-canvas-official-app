import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { IsArray, IsString } from 'class-validator';
import { GenericPageSection } from './generic-page-section.entity';

@Entity()
export class GenericPageSectionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  @IsString()
  title: string;

  @Column({ length: 255, nullable: false })
  @IsString()
  subtitle: string;

  @Column('simple-array', { nullable: true })
  @IsArray()
  @IsString({ each: true })
  keyPoints: string[];

  @Column({ nullable: true, default: null })
  @IsString()
  description: string;

  @Column({ nullable: true, default: null })
  @IsString()
  icon: string;

  @Column({ nullable: true, default: null })
  @IsString()
  image: string;

  @ManyToOne(
    () => GenericPageSection,
    (genericPageSection) => genericPageSection.items,
    { onDelete: 'CASCADE' },
  )
  genericPageSection: GenericPageSection;
}
