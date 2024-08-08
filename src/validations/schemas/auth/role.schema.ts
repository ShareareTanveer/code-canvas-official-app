import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  createRole: {
    body: Joi.object({
      name: Joi.string()
        .max(100)
        .required()
        .error(handleValidationErrors),
      users: Joi.array()
        .items(Joi.number())
        .optional()
        .error(handleValidationErrors),
      permissions: Joi.array()
        .items(Joi.number())
        .optional()
        .error(handleValidationErrors),
    }),
  },
  updateRole: {
    body: Joi.object({
      name: Joi.string()
        .max(100)
        .optional()
        .error(handleValidationErrors),
      users: Joi.array()
        .items(Joi.number())
        .optional()
        .error(handleValidationErrors),
      permissions: Joi.array()
        .items(Joi.number())
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
