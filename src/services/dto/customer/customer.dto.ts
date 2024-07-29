import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SimpleUserResponseDTO } from '../user/user.dto';
import { CreateCustomerCompanyDTO, CustomerCompanyResponseDTO } from './customer-company-details.dto';
import { CreateCustomerContactPersonDTO, CustomerContactPersonResponseDTO } from './customer-contact-person.dto';

export class CustomerResponseDTO {
  id?: number;
  user: SimpleUserResponseDTO;
  company: CustomerCompanyResponseDTO;
  contactPersons: CustomerContactPersonResponseDTO[];
  nidNumber: string;
  passportAttachment: string;
  photo: string;
  otherAttachment?: string;
}

export class CreateCustomerDTO {
  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  company: CreateCustomerCompanyDTO;

  @IsNotEmpty()
  contactPersons: CreateCustomerContactPersonDTO[];

  @IsNotEmpty()
  @IsString()
  nidNumber: string;

  @IsNotEmpty()
  @IsString()
  passportAttachment: string;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  otherAttachment: string;
}

export class UpdateCustomerDTO {
  @IsOptional()
  user: number;

  @IsOptional()
  company: CreateCustomerCompanyDTO;

  @IsOptional()
  contactPersons: CreateCustomerContactPersonDTO[];

  @IsOptional()
  @IsString()
  nidNumber: string;

  @IsOptional()
  @IsString()
  passportAttachment: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  otherAttachment: string;
}
