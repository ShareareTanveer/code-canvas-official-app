import { ContactUs } from '../../../entities/core/contact-us.entity';
import { ContactUsResponseDTO } from '../../dto/core/contact-us.dto';

export const toContactUsResponseDTO = (
  entity: ContactUs,
): ContactUsResponseDTO => {
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
