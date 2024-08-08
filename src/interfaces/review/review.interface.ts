import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ERating } from '../../enum/rating.enum';
import { ProductResponseDTO } from '../product/product.interface';
import { SimpleUserResponseDTO } from '../user/user.interface';

export class ReviewResponseDTO {
  id: number;
  product: ProductResponseDTO;
  user: SimpleUserResponseDTO;
  text?: string;
  rating: ERating;
}

export class CreateReviewDTO {
  @IsString()
  @IsOptional()
  text: string;

  @IsNotEmpty()
  @IsEnum(ERating)
  rating: ERating;

  @IsNumber()
  @IsNotEmpty()
  product: number;
}

export class UpdateReviewDTO {
  @IsString()
  @IsOptional()
  text: string;

  @IsOptional()
  @IsEnum(ERating)
  rating: ERating;
}
