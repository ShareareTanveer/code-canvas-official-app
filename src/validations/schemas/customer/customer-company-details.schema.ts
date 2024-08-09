import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  createCustomerCompany: {
    body: Joi.object({
      name: Joi.string()
        .required()
        .error(handleValidationErrors),
      email: Joi.string()
        .email()
        .required()
        .error(handleValidationErrors),
      phone: Joi.string()
        .required()
        .error(handleValidationErrors),
      city: Joi.string()
        .required()
        .error(handleValidationErrors),
      address: Joi.string()
        .required()
        .error(handleValidationErrors),
      tradeLicenseNo: Joi.string()
        .required()
        .error(handleValidationErrors),
      // tradeLicenseAttachment: Joi.string()
      //   .optional()
      //   .allow(null)
      //   .error(handleValidationErrors),
      // tinAttachment: Joi.string()
      //   .optional()
      //   .allow(null)
      //   .error(handleValidationErrors),
      // logo: Joi.string()
      //   .optional()
      //   .allow(null)
      //   .error(handleValidationErrors),
      postCode: Joi.string()
        .required()
        .error(handleValidationErrors),
      tinNo: Joi.string()
        .required()
        .error(handleValidationErrors),
    }),
  },

  updateCustomerCompany: {
    body: Joi.object({
      name: Joi.string()
        .optional()
        .error(handleValidationErrors),
      email: Joi.string()
        .email()
        .optional()
        .error(handleValidationErrors),
      phone: Joi.string()
        .optional()
        .error(handleValidationErrors),
      city: Joi.string()
        .optional()
        .error(handleValidationErrors),
      address: Joi.string()
        .optional()
        .error(handleValidationErrors),
      tradeLicenseNo: Joi.string()
        .optional()
        .error(handleValidationErrors),
      // tradeLicenseAttachment: Joi.string()
      //   .optional()
      //   .allow(null)
      //   .error(handleValidationErrors),
      // tinAttachment: Joi.string()
      //   .optional()
      //   .allow(null)
      //   .error(handleValidationErrors),
      // logo: Joi.string()
      //   .optional()
      //   .allow(null)
      //   .error(handleValidationErrors),
      postCode: Joi.string()
        .optional()
        .error(handleValidationErrors),
      tinNo: Joi.string()
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
