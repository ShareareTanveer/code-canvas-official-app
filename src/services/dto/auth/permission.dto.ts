import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class PermissionResponseDTO {
  id: number;
  name: string;
  entity_name: string;
  codename: string;
}

export class CreatePermissionDTO {
  @IsNotEmpty()
  @IsString()
  entity_name: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  codename: string;
}

export class UpdatePermissionDTO {
  @IsOptional()
  @IsString()
  entity_name?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  codename?: string;
}
