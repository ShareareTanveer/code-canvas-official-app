import { ISimpleUserResponse } from "user/user.interface";
import { ICreateCustomerContactPerson, ICustomerContactPersonResponse } from "./customer-contact-person.interface";
import { ICreateCustomerCompany, ICustomerCompanyResponse } from "./customer-company-details.interface";

export interface ICustomerResponse {
  id?: number;
  user: ISimpleUserResponse;
  company: ICustomerCompanyResponse;
  contactPerson: ICustomerContactPersonResponse;
  nidNumber: string;
  passportAttachment: string;
  otherAttachment?: string;
}

export interface ICreateCustomer {
  user?: number;
  company: ICreateCustomerCompany;
  contactPerson: ICreateCustomerContactPerson;
  nidNumber: string;
  passportAttachment?: string;
  otherAttachment?: string;
}

export interface IUpdateCustomer {
  user?: number;
  company?: ICreateCustomerCompany;
  contactPerson?: ICreateCustomerContactPerson;
  nidNumber?: string;
  passportAttachment?: string;
  otherAttachment?: string;
}
