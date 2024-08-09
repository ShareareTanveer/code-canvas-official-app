import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  createTag: {
    body: Joi.object({
      name: Joi.string()
        .max(100)
        .required()
        .error(handleValidationErrors),
    }),
  },

  updateTag: {
    body: Joi.object({
      name: Joi.string()
        .max(100)
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
