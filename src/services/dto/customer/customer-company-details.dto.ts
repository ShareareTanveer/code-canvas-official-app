import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CustomerCompanyResponseDTO {
  id?: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  tradeLicenseNo: string;
  tradeLicenseAttachment: string;
  tinAttachment: string;
  logo: string;
  postCode: string;
  tinNo: string;
}

export class CreateCustomerCompanyDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  tradeLicenseNo: string;

  @IsNotEmpty()
  @IsString()
  tradeLicenseAttachment: string;

  @IsNotEmpty()
  @IsString()
  tinAttachment: string;

  @IsNotEmpty()
  @IsString()
  logo: string;

  @IsNotEmpty()
  @IsString()
  postCode: string;

  @IsNotEmpty()
  @IsString()
  tinNo: string;
}
