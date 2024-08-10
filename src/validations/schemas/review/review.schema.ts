import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';
import { ERating } from '../../../enum/rating.enum';

export default {
  create: {
    body: Joi.object({
      text: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      rating: Joi.number()
        .valid(...Object.values(ERating))
        .required()
        .error(handleValidationErrors),
      product: Joi.number()
        .required()
        .error(handleValidationErrors),
    }),
  },

  update: {
    body: Joi.object({
      text: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      rating: Joi.number()
        .valid(...Object.values(ERating))
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
