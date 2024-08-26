import joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  create: {
    body: joi.object({
      name: joi
        .string()
        .min(3)
        .max(100)
        .required()
        .error(handleValidationErrors),
      description: joi
        .string()
        .min(3)
        .max(100)
        .optional()
        .error(handleValidationErrors),
    }),
  },
  update: {
    body: joi.object({
      name: joi.string().min(3).max(100).error(handleValidationErrors),
      description: joi
        .string()
        .min(3)
        .max(100)
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
