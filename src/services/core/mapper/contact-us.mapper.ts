import { IContactUsResponse } from 'core/contact-us.interface';
import { ContactUs } from '../../../entities/core/contact-us.entity';

export const toIContactUsResponse = (
  entity: ContactUs,
): IContactUsResponse => {
  return {
    id: entity.id,
    phone: entity.phone,
    email: entity.email,
    fullName: entity.fullName,
    address: entity.address,
    company: entity.company,
    message: entity.message,
    subject: entity.subject,
  };
};
