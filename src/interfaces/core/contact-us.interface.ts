import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  IsEmail,
} from 'class-validator';

export class ContactUsResponseDTO {
  id: number;
  phone: string;
  email: string;
  subject?: string;
  message: string;
  address?: string;
  fullName?: string;
  company?: string;
}

export class CreateContactUsDTO {
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  subject?: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  address?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  fullName?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  company?: string;
}

export class UpdateContactUsDTO {
  @IsString()
  @MaxLength(15)
  @IsOptional()
  phone: string;

  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  subject?: string;

  @IsString()
  @IsOptional()
  message: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  address?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  fullName?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  company?: string;
}
