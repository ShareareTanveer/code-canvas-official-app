export interface ICustomerCompanyResponse {
  id?: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  tradeLicenseNo: string;
  tradeLicenseAttachment?: string;
  tinAttachment?: string;
  logo?: string;
  postCode: string;
  tinNo: string;
}

export interface ICreateCustomerCompany {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  tradeLicenseNo: string;
  tradeLicenseAttachment?: string;
  tinAttachment?: string;
  logo?: string;
  postCode: string;
  tinNo: string;
}
