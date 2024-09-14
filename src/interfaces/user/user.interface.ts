import { ISimpleRoleResponse } from "auth/role.interface";
import { EGender } from "../../enum/gender.enum";
import { IUserDetailResponse } from "./userDetail.interface";

export interface IRegisterUser {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  address?: string;
  gender?: EGender;
  image?: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  address?: string;
  gender: EGender;
  role: number;
  image?: string;
}

export interface IUpdateUser {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  gender?: EGender;
  image?: string;
}

export interface IUpdateUserByAdmin {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  gender?: EGender;
  role?: number;
  image?: string;
}

export interface ISimpleUserResponse {
  id?: number;
  firstName?: string;
  lastName?: string;
  status?: boolean;
  email?: string;
  details?: IUserDetailResponse;
  role?: ISimpleRoleResponse;
}