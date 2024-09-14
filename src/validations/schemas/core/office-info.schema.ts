import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  create: {
    body: Joi.object({
      phone: Joi.string()
        .max(15)
        .required()
        .error(handleValidationErrors),
      supportEmail: Joi.string()
        .email()
        .max(100)
        .required()
        .error(handleValidationErrors),
      officialEmail: Joi.string()
        .email()
        .max(100)
        .required()
        .error(handleValidationErrors),
      supportPhone: Joi.string()
        .max(15)
        .required()
        .error(handleValidationErrors),
      ownerName: Joi.string()
        .max(100)
        .required()
        .error(handleValidationErrors),
      brandName: Joi.string()
        .max(100)
        .required()
        .error(handleValidationErrors),
      workingDayAndTime: Joi.string()
        .max(100)
        .required()
        .error(handleValidationErrors),
      closedDay: Joi.string()
        .max(100)
        .required()
        .error(handleValidationErrors),
      bin: Joi.string()
        .max(50)
        .required()
        .error(handleValidationErrors),
      hotline: Joi.string()
        .max(15)
        .required()
        .error(handleValidationErrors),
      officeAddress: Joi.string()
        .required()
        .error(handleValidationErrors),
      secondaryOfficeAddress: Joi.string()
        .optional()
        .error(handleValidationErrors),
      latitude: Joi.number()
        .required()
        .error(handleValidationErrors),
      longitude: Joi.number()
        .required()
        .error(handleValidationErrors),
      linkedIn: Joi.string()
        .optional()
        .error(handleValidationErrors),
      facebook: Joi.string()
        .optional()
        .error(handleValidationErrors),
      twitter: Joi.string()
        .optional()
        .error(handleValidationErrors),
      instagram: Joi.string()
        .optional()
        .error(handleValidationErrors),
    }),
  },

  update: {
    body: Joi.object({
      phone: Joi.string()
        .max(15)
        .optional()
        .error(handleValidationErrors),
      supportEmail: Joi.string()
        .email()
        .max(100)
        .optional()
        .error(handleValidationErrors),
      officialEmail: Joi.string()
        .email()
        .max(100)
        .optional()
        .error(handleValidationErrors),
      supportPhone: Joi.string()
        .max(15)
        .optional()
        .error(handleValidationErrors),
      ownerName: Joi.string()
        .max(100)
        .optional()
        .error(handleValidationErrors),
      brandName: Joi.string()
        .max(100)
        .optional()
        .error(handleValidationErrors),
      workingDayAndTime: Joi.string()
        .max(100)
        .optional()
        .error(handleValidationErrors),
      closedDay: Joi.string()
        .max(100)
        .optional()
        .error(handleValidationErrors),
      bin: Joi.string()
        .max(50)
        .optional()
        .error(handleValidationErrors),
      hotline: Joi.string()
        .max(15)
        .optional()
        .error(handleValidationErrors),
      officeAddress: Joi.string()
        .optional()
        .error(handleValidationErrors),
      secondaryOfficeAddress: Joi.string()
        .optional()
        .error(handleValidationErrors),
      latitude: Joi.number()
        .optional()
        .error(handleValidationErrors),
      longitude: Joi.number()
        .optional()
        .error(handleValidationErrors),
      linkedIn: Joi.string()
        .optional()
        .error(handleValidationErrors),
      facebook: Joi.string()
        .optional()
        .error(handleValidationErrors),
      twitter: Joi.string()
        .optional()
        .error(handleValidationErrors),
      instagram: Joi.string()
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
