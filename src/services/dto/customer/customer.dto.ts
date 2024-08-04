import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SimpleUserResponseDTO } from '../user/user.dto';
import { CreateCustomerCompanyDTO, CustomerCompanyResponseDTO } from './customer-company-details.dto';
import { CreateCustomerContactPersonDTO, CustomerContactPersonResponseDTO } from './customer-contact-person.dto';

export class CustomerResponseDTO {
  id?: number;
  user: SimpleUserResponseDTO;
  company: CustomerCompanyResponseDTO;
  contactPerson: CustomerContactPersonResponseDTO;
  nidNumber: string;
  passportAttachment: string;
  otherAttachment?: string;
}

export class CreateCustomerDTO {
  @IsOptional()
  user?: number;

  @IsNotEmpty()
  company: CreateCustomerCompanyDTO;

  @IsNotEmpty()
  contactPerson: CreateCustomerContactPersonDTO;

  @IsNotEmpty()
  @IsString()
  nidNumber: string;

  @IsOptional()
  @IsString()
  passportAttachment?: string;

  @IsOptional()
  @IsString()
  otherAttachment?: string;
}

export class UpdateCustomerDTO {
  @IsOptional()
  user?: number;

  @IsOptional()
  company: CreateCustomerCompanyDTO;

  @IsOptional()
  contactPerson: CreateCustomerContactPersonDTO;

  @IsOptional()
  @IsString()
  nidNumber: string;

  @IsOptional()
  @IsString()
  passportAttachment?: string;

  @IsOptional()
  @IsString()
  otherAttachment?: string;
}
