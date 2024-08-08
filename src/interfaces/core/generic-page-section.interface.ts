import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
} from 'class-validator';
import { GenericPageSectionItemResponseDTO } from './generic-page-section-item.interface';

export class GenericPageSectionResponseDTO {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon?: string;
  image?: string;
  sectionName: string;
  keyPoints?: string[];
  items?: GenericPageSectionItemResponseDTO[];
}

export class CreateGenericPageSectionDTO {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  sectionName: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  subtitle: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  keyPoints?: string[];
}

export class UpdateGenericPageSectionDTO {
  @IsString()
  @MaxLength(255)
  @IsOptional()
  title?: string;
  
  @IsString()
  @MaxLength(255)
  @IsOptional()
  sectionName?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  subtitle?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  keyPoints?: string[];
}
