import joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  createPermission: {
    body: joi.object({
      entity_name: joi
        .string()
        .required()
        .error(handleValidationErrors),
      name: joi.string().required().error(handleValidationErrors),
      codename: joi.string().required().error(handleValidationErrors),
    }),
  },
  updatePermission: {
    body: joi.object({
      entity_name: joi
        .string()
        .optional()
        .error(handleValidationErrors),
      name: joi.string().optional().error(handleValidationErrors),
      codename: joi.string().optional().error(handleValidationErrors),
    }),
  },
};
