import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IsArray, IsString } from 'class-validator';
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

  @Column('json', { nullable: true })
  @IsArray()
  keyPoints: object[];

  @OneToMany(
    () => GenericPageSectionItem,
    (genericPageSectionItem) =>
      genericPageSectionItem.genericPageSection,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn()
  items: GenericPageSectionItem[];
}
