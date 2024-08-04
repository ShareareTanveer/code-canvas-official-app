import { Customer } from "../../../entities/customer/customer.entity";
import { CustomerResponseDTO } from "../../../services/dto/customer/customer.dto";

export const toCustomerResponseDTO = (
  entity: Customer,
): CustomerResponseDTO => {
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
