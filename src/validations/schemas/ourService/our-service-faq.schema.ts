import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';

export default {
  createOurServiceFAQ: {
    body: Joi.object({
      question: Joi.string().required().error(handleValidationErrors),
      answer: Joi.string().required().error(handleValidationErrors),
    }),
  },
  updateOurServiceFAQ: {
    body: Joi.object({
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
    }),
  },
};
