import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';
export default {
  create: {
    body: Joi.object({
      title: Joi.string().required().error(handleValidationErrors),
      subtitle: Joi.string().required().error(handleValidationErrors),
      slug: Joi.string().required().error(handleValidationErrors),
      description: Joi.string().required().error(handleValidationErrors),
      content: Joi.string().required().error(handleValidationErrors),
      icon: Joi.string().optional().allow(null).error(handleValidationErrors),
      isFeatured: Joi.boolean().optional().allow(null).error(handleValidationErrors),
      keyPoints: Joi.array().items(Joi.string()).optional().error(handleValidationErrors),
      category: Joi.number().integer().required().error(handleValidationErrors),
    }),
  },

  update: {
    body: Joi.object({
      title: Joi.string().optional().allow(null).error(handleValidationErrors),
      subtitle: Joi.string().optional().allow(null).error(handleValidationErrors),
      slug: Joi.string().optional().allow(null).error(handleValidationErrors),
      description: Joi.string().optional().allow(null).error(handleValidationErrors),
      content: Joi.string().optional().allow(null).error(handleValidationErrors),
      isFeatured: Joi.boolean().optional().allow(null).error(handleValidationErrors),
      icon: Joi.string().optional().allow(null).error(handleValidationErrors),
      deleteImages: Joi.array().items(Joi.number().integer()).optional().error(handleValidationErrors),
      keyPoints: Joi.array().items(Joi.string()).optional().error(handleValidationErrors),
      category: Joi.number().integer().optional().error(handleValidationErrors),
    }),
  },
};
