import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  create: {
    body: Joi.object({
      cartId: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .error(handleValidationErrors),
      user: Joi.number()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
    }),
  },

  update: {
    body: Joi.object({
      cartId: Joi.string()
        .guid({ version: 'uuidv4' })
        .required()
        .error(handleValidationErrors),
      user: Joi.number()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
    }),
  },
};
