import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  CreateOurServiceImageDTO,
  OurServiceImageResponseDTO,
} from './our-service-image.dto';
import { CreateOurServiceFAQResponseDTO } from './our-service-faq.dto';
import { IsFile } from '../../../decorators/file-validator.decorator';

export class OurServiceResponseDTO {
  id?: number;
  title: string;
  subtitle: string;
  slug: string;
  icon: string;
  images?: OurServiceImageResponseDTO[];
}

export class OurServiceDetailResponseDTO {
  id?: number;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  icon: string;
  keyPoints: string[];
  images: OurServiceImageResponseDTO[];
  faqs: CreateOurServiceFAQResponseDTO[];
}

export class CreateOurServiceDTO {
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
  icon?: string;

  @IsOptional()
  faqs?: CreateOurServiceFAQResponseDTO[];

  @IsArray()
  @IsOptional()
  keyPoints?: string[];

  // @IsFile({
  //   allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
  //   maxSizeInBytes: 5 * 1024 * 1024,
  // })
  // @IsNotEmpty()
  // @IsArray()
  @IsOptional()
  images?: Express.Multer.File[];
}

export class UpdateOurServiceDTO {
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
  icon?: string;

  @IsOptional()
  faqs: CreateOurServiceFAQResponseDTO[];

  @IsArray()
  @IsOptional()
  keyPoints?: string[];

  @IsOptional()
  @IsArray()
  addImages?: Express.Multer.File[];

  @IsOptional()
  @IsArray()
  deleteImages?: number[];
}
