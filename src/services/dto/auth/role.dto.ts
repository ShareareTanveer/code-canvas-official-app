import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PermissionResponseDTO } from './permission.dto';
import { SimpleUserResponseDTO } from '../user/user.dto';

export class SimpleRoleResponseDTO {
  id: number;
  name: string;
}

export class RoleResponseDTO {
  id: number;
  name: string;
  permissions: PermissionResponseDTO[];
  users: SimpleUserResponseDTO[];
}

export class CreateRoleDTO {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  users?: number[];

  @IsOptional()
  permissions?: number[];
}

export class UpdateRoleDTO {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsOptional()
  users?: number[];

  @IsOptional()
  permissions?: number[];
}
