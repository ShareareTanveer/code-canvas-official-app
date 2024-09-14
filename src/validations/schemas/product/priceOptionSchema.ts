import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';
import { EDiscountType } from '../../../enum/discountType.enum';

const discountTypeEnum = Object.values(EDiscountType);

export default {
  create: {
    body: Joi.object({
      discountType: Joi.string()
        .valid(...discountTypeEnum)
        .required()
        .error(handleValidationErrors),
      discount: Joi.number().required().error(handleValidationErrors),
      support_for: Joi.string()
        .required()
        .error(handleValidationErrors),
      title: Joi.string().required().error(handleValidationErrors),
      pricePer: Joi.string().optional().error(handleValidationErrors),
      serviceLink: Joi.string().optional().error(handleValidationErrors),
      price: Joi.number().required().error(handleValidationErrors),
      keyPoints: Joi.array()
        .items(Joi.string())
        .optional()
        .error(handleValidationErrors),
    }),
  },

  update: {
    body: Joi.object({
      discountType: Joi.string()
        .valid(...discountTypeEnum)
        .optional()
        .error(handleValidationErrors),
      discount: Joi.number().optional().error(handleValidationErrors),
      support_for: Joi.string()
        .optional()
        .error(handleValidationErrors),
      title: Joi.string().optional().error(handleValidationErrors),
      serviceLink: Joi.string().optional().error(handleValidationErrors),
      pricePer: Joi.string().optional().error(handleValidationErrors),
      id: Joi.number().optional().error(handleValidationErrors),
      price: Joi.number().optional().error(handleValidationErrors),
      keyPoints: Joi.array()
        .items(Joi.string())
        .optional()
        .error(handleValidationErrors),
    }),
  },
};
