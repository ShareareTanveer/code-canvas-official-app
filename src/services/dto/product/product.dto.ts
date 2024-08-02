import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseDTO } from '../base.dto';
import { CategoryResponseDTO } from '../category/category.dto';
import { ProductImageResponseDTO } from './product-image.dto';
import { TagResponseDTO } from '../tag/tag.dto';
import { ReviewResponseDTO } from '../review/review.dto';

export class ProductResponseDTO {
  id?: number;
  category: CategoryResponseDTO;
  title: string;
  slug: string;
  live_link: string;
  price: number;
  images?: ProductImageResponseDTO[];
  total_sale?: number;
}

export class ProductDetailResponseDTO {
  id?: number;
  category: CategoryResponseDTO;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  live_link: string;
  support_for: string;
  price: number;
  is_documented: boolean;
  images?: ProductImageResponseDTO[];
  total_sale?: number;
  tags?: TagResponseDTO[];
  reviews?: ReviewResponseDTO[];
}

export class CreateProductDTO {
  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  live_link: string;

  @IsOptional()
  @IsString() 
  support_for: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsBoolean()
  @IsOptional()
  is_documented: boolean;

  @IsOptional()
  images?: Express.Multer.File[];

  @IsOptional()
  tags?: number[];
}

export class UpdateProductDTO {
  @IsOptional()
  @IsNumber()
  category: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  live_link: string;

  @IsOptional()
  @IsString() 
  support_for: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsBoolean()
  @IsOptional()
  is_documented: boolean;

  @IsOptional()
  addImages?: Express.Multer.File[];

  @IsOptional()
  @IsArray()
  deleteImages?: number[];

  @IsOptional()
  @IsArray()
  tags?: number[];
}
