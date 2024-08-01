import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class sendEmailOtpDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class verifyEmailOtpDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  otp: number;
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
