import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class sendEmailDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class verifyEmailDTO {
  @IsString()
  @IsNotEmpty()
  hash: string;
}

export class resetPasswordDTO {
  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;

  @IsNotEmpty()
  confirmNewPassword: string;
}

export class loginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
