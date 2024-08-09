import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  createOurServiceImage: {
    body: Joi.object({
      image: Joi.string()
        .required()
        .error(handleValidationErrors),
    }),
  },
};
