import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  create: {
    body: Joi.object({
      name: Joi.string().required().error(handleValidationErrors),
      color: Joi.string().required().error(handleValidationErrors),
      subtitle: Joi.string().required().error(handleValidationErrors),
      icon: Joi.string().required().error(handleValidationErrors),
    }),
  },

  update: {
    body: Joi.object({
      name: Joi.string().optional().error(handleValidationErrors),
      color: Joi.string().optional().error(handleValidationErrors),
      subtitle: Joi.string().optional().error(handleValidationErrors),
      icon: Joi.string().optional().error(handleValidationErrors),
      image: Joi.optional().error(handleValidationErrors),
    }),
  },
};
