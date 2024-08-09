import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';
import customerCompanyDetailsSchema from './customer-company-details.schema';
import customerContactPersonSchema from './customer-contact-person.schema';


export default {
  create: {
    body: Joi.object({
      user: Joi.number()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      company: customerCompanyDetailsSchema.createCustomerCompany.body
        .required()
        .error(handleValidationErrors),
      contactPerson: customerContactPersonSchema.createCustomerContactPerson.body
        .required()
        .error(handleValidationErrors),
      nidNumber: Joi.string()
        .required()
        .error(handleValidationErrors),
      // passportAttachment: Joi.string()
      //   .required()
      //   .error(handleValidationErrors),
      // otherAttachment: Joi.string()
      //   .optional()
      //   .allow(null)
      //   .error(handleValidationErrors),
    }),
  },

  update: {
    body: Joi.object({
      user: Joi.number()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      company: customerCompanyDetailsSchema.updateCustomerCompany.body
        .optional()
        .error(handleValidationErrors),
      contactPerson: customerContactPersonSchema.updateCustomerContactPerson.body
        .optional()
        .error(handleValidationErrors),
      nidNumber: Joi.string()
        .optional()
        .error(handleValidationErrors),
      passportAttachment: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      otherAttachment: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
    }),
  },
};
