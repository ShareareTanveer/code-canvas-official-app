import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
  } from 'class-validator';
  
  export class TagResponseDTO {
    id: number;
    name: string;
  }
  
  export class CreateTagDTO {
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    name: string;
  }
  
  export class UpdateTagDTO {
    @IsString()
    @MaxLength(100)
    @IsOptional()
    name?: string;
  }
  