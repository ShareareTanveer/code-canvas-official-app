import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  addToWishlist: {
    body: Joi.object({
      product: Joi.number()
        .required()
        .error(handleValidationErrors),
    }),
  },
};
