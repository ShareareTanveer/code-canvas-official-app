import { IsNotEmpty, IsEmail, IsString, IsOptional } from "class-validator";
import { EGender } from "../../../enum/gender.enum";

export class CustomerContactPersonResponseDTO {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  designation: string;
  gender: EGender;
}

export class CreateCustomerContactPersonDTO {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  designation: string;

  @IsNotEmpty()
  gender: EGender;
}
