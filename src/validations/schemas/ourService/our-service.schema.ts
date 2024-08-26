import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';
import ourServiceFaqSchema from './our-service-faq.schema';

export default {
  create: {
    body: Joi.object({
      title: Joi.string().required().error(handleValidationErrors),
      subtitle: Joi.string().required().error(handleValidationErrors),
      slug: Joi.string().required().error(handleValidationErrors),
      description: Joi.string()
        .required()
        .error(handleValidationErrors),
      icon: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      price: Joi
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      content: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      contentTitle: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      faqs: Joi.array()
        .items(ourServiceFaqSchema.createOurServiceFAQ.body)
        .optional()
        .error(handleValidationErrors),
      keyPoints: Joi.array()
        .items(Joi.string())
        .optional()
        .error(handleValidationErrors),
      category: Joi.number()
        .integer()
        .optional()
        .error(handleValidationErrors),
    }),
  },

  update: {
    body: Joi.object({
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
        price: Joi
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      content: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      contentTitle: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      icon: Joi.string()
        .optional()
        .allow(null)
        .error(handleValidationErrors),
      addFaqs: Joi.array()
        .items(
          Joi.object({
            question: Joi.string()
              .required()
              .error(handleValidationErrors),
            answer: Joi.string()
              .required()
              .error(handleValidationErrors),
          }),
        )
        .optional()
        .error(handleValidationErrors),
      deleteFaqs: Joi.array()
        .items(Joi.number())
        .optional()
        .error(handleValidationErrors),
      keyPoints: Joi.array()
        .items(Joi.string())
        .optional()
        .error(handleValidationErrors),
      deleteImages: Joi.array()
        .items(Joi.number())
        .optional()
        .error(handleValidationErrors),
      category: Joi.number()
        .integer()
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
