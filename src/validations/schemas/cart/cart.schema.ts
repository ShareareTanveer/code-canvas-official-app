import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  addToCart: {
    body: Joi.object({
      product: Joi.number()
        .required()
        .error(handleValidationErrors),
      cartId: Joi.string()
        .optional()
        .uuid()
        .allow(null)
        .error(handleValidationErrors),
    }),
  },
};
