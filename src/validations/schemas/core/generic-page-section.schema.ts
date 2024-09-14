import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  create: {
    body: Joi.object({
      title: Joi.string()
        .max(255)
        .required()
        .error(handleValidationErrors),
      sectionName: Joi.string()
        .max(255)
        .required()
        .error(handleValidationErrors),
      subtitle: Joi.string()
        .required()
        .error(handleValidationErrors),
      description: Joi.string()
        .required()
        .error(handleValidationErrors),
      icon: Joi.string()
        .optional()
        .error(handleValidationErrors),
      image: Joi.string()
        .optional()
        .error(handleValidationErrors),
      keyPoints: Joi.array()
        .items(Joi.string())
        .optional()
        .error(handleValidationErrors),
    }),
  },

  update: {
    body: Joi.object({
      title: Joi.string()
        .max(255)
        .optional()
        .error(handleValidationErrors),
      sectionName: Joi.string()
        .max(255)
        .optional()
        .error(handleValidationErrors),
      subtitle: Joi.string()
        .max(255)
        .optional()
        .error(handleValidationErrors),
      description: Joi.string()
        .optional()
        .error(handleValidationErrors),
      icon: Joi.string()
        .optional()
        .error(handleValidationErrors),
      image: Joi.string()
        .optional()
        .error(handleValidationErrors),
      keyPoints: Joi.array()
        .items(Joi.string())
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
