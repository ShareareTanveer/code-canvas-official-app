import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
  import { CreateOurServiceImageDTO, OurServiceImageResponseDTO } from './our-service-image.dto';
  import { CreateOurServiceFAQResponseDTO } from './our-service-faq.dto';

  
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
    keyPoints: object[];
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
    keyPoints?: object[];

    @IsNotEmpty()
    images?: string[];
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
    keyPoints?: object[];

    @IsOptional()
    images?: CreateOurServiceImageDTO[];
  }
  