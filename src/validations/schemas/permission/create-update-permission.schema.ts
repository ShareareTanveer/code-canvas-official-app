import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  createPermission: {
    body: Joi.object({
      entity_name: Joi.string()
        .required()
        .error(handleValidationErrors),
      name: Joi.string()
        .required()
        .error(handleValidationErrors),
      codename: Joi.string()
        .required()
        .error(handleValidationErrors),
    }),
  },

  updatePermission: {
    body: Joi.object({
      entity_name: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      name: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      codename: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
    }),
  },
};
