export interface IContactUsResponse {
  id: number;
  phone: string;
  email: string;
  subject?: string;
  message: string;
  address?: string;
  fullName?: string;
  company?: string;
}
export interface ICreateContactUs {
  phone: string;
  email: string;
  subject?: string;
  message: string;
  address?: string;
  fullName?: string;
  company?: string;
}

export interface IUpdateContactUs {
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
  address?: string;
  fullName?: string;
  company?: string;
}
