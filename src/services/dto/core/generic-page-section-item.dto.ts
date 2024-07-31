import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
  IsNumber,
} from 'class-validator';
import { GenericPageSectionResponseDTO } from './generic-page-section.dto';

export class GenericPageSectionItemResponseDTO {
  id: number;
  title: string;
  subtitle: string;
  keyPoints: string[];
  description?: string;
  icon?: string;
  image?: string;
  genericPageSection?: GenericPageSectionResponseDTO;
}

export class CreateGenericPageSectionItemDTO {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  subtitle: string;

  @IsArray()
  @IsOptional()
  keyPoints: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  genericPageSection?: number;
}

export class UpdateGenericPageSectionItemDTO {
  @IsString()
  @MaxLength(255)
  @IsOptional()
  title?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  subtitle?: string;

  @IsArray()
  @IsOptional()
  keyPoints: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsOptional()
  genericPageSection?: number;
}
