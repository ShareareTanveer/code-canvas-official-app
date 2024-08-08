export interface ISendEmail {
  email: string;
}

export interface IResetPassword {
  newPassword: string;
  confirmNewPassword: string;
}

export interface ILogin {
  email: string;
  password: string;
}
