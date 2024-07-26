import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CategoryResponseDTO {
  id: number;
  name: string;
}

export class CreateCategoryDTO {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;
}

export class UpdateCategoryDTO {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  name?: string;
}
