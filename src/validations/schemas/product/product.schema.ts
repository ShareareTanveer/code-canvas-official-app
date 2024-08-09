import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  create: {
    body: Joi.object({
      category: Joi.number()
        .required()
        .error(handleValidationErrors),
      title: Joi.string()
        .required()
        .error(handleValidationErrors),
      subtitle: Joi.string()
        .required()
        .error(handleValidationErrors),
      slug: Joi.string()
        .required()
        .error(handleValidationErrors),
      description: Joi.string()
        .required()
        .error(handleValidationErrors),
      live_link: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      support_for: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      price: Joi.number()
        .required()
        .error(handleValidationErrors),
      is_documented: Joi.boolean()
        .optional()
        .error(handleValidationErrors),
      tags: Joi.array()
        .items(Joi.number())
        .optional()
        .error(handleValidationErrors),
    }),
  },

  update: {
    body: Joi.object({
      category: Joi.number()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      title: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      subtitle: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      slug: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      description: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      live_link: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      support_for: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      price: Joi.number()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      is_documented: Joi.boolean()
        .optional()
        .error(handleValidationErrors),
      deleteImages: Joi.array()
        .items(Joi.number())
        .optional()
        .error(handleValidationErrors),
      tags: Joi.array()
        .items(Joi.number())
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
