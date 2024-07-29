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
    contactPersons: entity.contactPersons,
    passportAttachment: entity.passportAttachment,
    photo: entity.photo,
    otherAttachment: entity.otherAttachment,
  };
};
