import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';
import { EGender } from '../../../enum/gender.enum';


export default {
  createCustomerContactPerson: {
    body: Joi.object({
      fullName: Joi.string()
        .required()
        .error(handleValidationErrors),
      email: Joi.string()
        .email()
        .required()
        .error(handleValidationErrors),
      phone: Joi.string()
        .required()
        .error(handleValidationErrors),
      designation: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      gender: Joi.string()
        .valid(...Object.values(EGender))
        .required()
        .error(handleValidationErrors),
    }),
  },

  updateCustomerContactPerson: {
    body: Joi.object({
      fullName: Joi.string()
        .optional()
        .error(handleValidationErrors),
      email: Joi.string()
        .email()
        .optional()
        .error(handleValidationErrors),
      phone: Joi.string()
        .optional()
        .error(handleValidationErrors),
      designation: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      gender: Joi.string()
        .valid(...Object.values(EGender))
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
