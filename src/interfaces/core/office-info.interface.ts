export interface IOfficeInfoResponse {
  id: number;
  phone: string;
  officialEmail: string;
  supportEmail: string;
  supportPhone: string;
  ownerName: string;
  brandName: string;
  workingDayAndTime: string;
  closedDay: string;
  bin: string;
  hotline: string;
  officeAddress: string;
  secondaryOfficeAddress?: string;
  latitude: number;
  longitude: number;
  linkedIn?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

export interface ICreateOfficeInfo {
  phone: string;
  supportEmail: string;
  officialEmail: string;
  supportPhone: string;
  ownerName: string;
  brandName: string;
  workingDayAndTime: string;
  closedDay: string;
  bin: string;
  hotline: string;
  officeAddress: string;
  secondaryOfficeAddress?: string;
  latitude?: number;
  longitude?: number;
  linkedIn?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
}

export interface IUpdateOfficeInfo {
  phone?: string;
  supportEmail?: string;
  officialEmail?: string;
  supportPhone?: string;
  ownerName?: string;
  brandName?: string;
  workingDayAndTime?: string;
  closedDay?: string;
  bin?: string;
  hotline?: string;
  officeAddress?: string;
  secondaryOfficeAddress?: string;
  latitude?: number;
  longitude?: number;
  linkedIn?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
}
