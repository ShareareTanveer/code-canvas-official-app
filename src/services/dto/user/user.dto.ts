import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserDetailResponseDTO } from './userDetail.dto';
import { SimpleRoleResponseDTO } from '../auth/role.dto';
import { EGender } from '../../../enum/gender.enum';
import { BaseDTO } from '../base.dto';

export class RegisterUserDTO extends BaseDTO {
  id?: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsEnum(EGender)
  gender: EGender;

  @IsOptional()
  @IsString()
  image?: string;
}

export class CreateUserDTO extends BaseDTO {
  id?: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsEnum(EGender)
  gender: EGender;

  @IsNotEmpty()
  // @IsNumber()
  role: number;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateUserDTO extends BaseDTO {
  id?: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(EGender)
  gender: EGender;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateUserByAdminDTO extends BaseDTO {
  id?: number;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(EGender)
  gender: EGender;

  @IsOptional()
  @IsNumber()
  role?: number;

  @IsOptional()
  @IsString()
  image?: string;
}

export class SimpleUserResponseDTO {
  id?: number;
  firstName?: string;
  lastName?: string;
  status?: boolean;
  email?: string;
  details?: UserDetailResponseDTO;
  role?: SimpleRoleResponseDTO;
}
