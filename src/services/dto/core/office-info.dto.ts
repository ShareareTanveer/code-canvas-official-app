import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  IsEmail,
} from 'class-validator';

export class OfficeInfoResponseDTO {
  id: number;
  phone: string;
  officialEmail: string;
  supportEmail: string;
  supportPhone: string;
  ownerName: string;
  brandName: string;
  workingDayAndTime: string;
  closedDay: string;
  bin: string;
  hotline: string;
  officeAddress: string;
  secondaryOfficeAddress?: string;
  latitude: number;
  longitude: number;
}

export class CreateOfficeInfoDTO {
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  supportEmail: string;

  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  officialEmail: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  supportPhone: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  brandName: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  workingDayAndTime: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  closedDay: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  bin: string;

  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  hotline: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  officeAddress: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  secondaryOfficeAddress?: string;

  @IsNumber()
  @IsNotEmpty()
  latitude?: number;

  @IsNumber()
  @IsNotEmpty()
  longitude?: number;
}

export class UpdateOfficeInfoDTO {
  @IsString()
  @MaxLength(15)
  @IsOptional()
  phone?: string;

  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  supportEmail?: string;

  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  officialEmail?: string;

  @IsString()
  @MaxLength(15)
  @IsOptional()
  supportPhone?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  ownerName?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  brandName?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  workingDayAndTime?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  closedDay?: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  bin?: string;

  @IsString()
  @MaxLength(15)
  @IsOptional()
  hotline?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  officeAddress?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  secondaryOfficeAddress?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;
}
