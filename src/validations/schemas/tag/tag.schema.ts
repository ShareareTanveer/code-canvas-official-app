import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  create: {
    body: Joi.object({
      name: Joi.string()
        .max(100)
        .required()
        .error(handleValidationErrors),
    }),
  },

  update: {
    body: Joi.object({
      name: Joi.string()
        .max(100)
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
