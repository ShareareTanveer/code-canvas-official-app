import { EGender } from "../../enum/gender.enum";

export interface ICustomerContactPersonResponse {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  designation?: string;
  gender: EGender;
}

export interface ICreateCustomerContactPerson {
  fullName: string;
  email: string;
  phone: string;
  designation?: string;
  gender: EGender;
}
