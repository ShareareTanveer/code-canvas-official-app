import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  create: {
    body: Joi.object({
      phone: Joi.string()
        .max(15)
        .required()
        .error(handleValidationErrors),
      email: Joi.string()
        .email()
        .max(100)
        .required()
        .error(handleValidationErrors),
      subject: Joi.string()
        .max(255)
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      message: Joi.string()
        .required()
        .error(handleValidationErrors),
      address: Joi.string()
        .max(255)
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      fullName: Joi.string()
        .max(255)
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      company: Joi.string()
        .max(255)
        .optional()
        .allow(null)
        .error(handleValidationErrors),
    }),
  },
  update: {
    body: Joi.object({
      phone: Joi.string()
        .max(15)
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      email: Joi.string()
        .email()
        .max(100)
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      subject: Joi.string()
        .max(255)
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      message: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      address: Joi.string()
        .max(255)
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      fullName: Joi.string()
        .max(255)
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      company: Joi.string()
        .max(255)
        .optional()
        .allow(null)
        .error(handleValidationErrors),
    }),
  },
};