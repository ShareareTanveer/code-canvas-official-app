import { ICustomerResponse } from "customer/customer.interface";
import { Customer } from "../../../entities/customer/customer.entity";

export const toICustomerResponse = (
  entity: Customer,
): ICustomerResponse => {
  return {
    id: entity.id,
    user: entity.user,
    nidNumber: entity.nidNumber,
    company: entity.company,
    contactPerson: entity.contactPerson,
    passportAttachment: entity.passportAttachment,
    otherAttachment: entity.otherAttachment,
  };
};
