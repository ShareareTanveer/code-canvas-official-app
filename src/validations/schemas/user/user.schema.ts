import Joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';
import { EGender } from '../../../enum/gender.enum';

const genderEnum = Object.values(EGender);

export default {
  registerUser: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required()
        .error(handleValidationErrors),
      password: Joi.string()
        .min(8)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        )
        .required()
        .error(handleValidationErrors),
      firstName: Joi.string().required().error(handleValidationErrors),
      lastName: Joi.string().optional().error(handleValidationErrors),
      phone: Joi.string().optional().error(handleValidationErrors),
      address: Joi.string().optional().error(handleValidationErrors),
      gender: Joi.string()
        .valid(...genderEnum)
        .optional()
        .error(handleValidationErrors),
      image: Joi.string().optional().error(handleValidationErrors),
    }),
  },
  loginUser: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required()
        .error(handleValidationErrors),
      password: Joi.string()
        .min(8)
        .required()
        .error(handleValidationErrors),
    }),
  },
  createUser: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required()
        .error(handleValidationErrors),
      password: Joi.string()
        .min(8)
        .required()
        .error(handleValidationErrors),
      firstName: Joi.string().required().error(handleValidationErrors),
      lastName: Joi.string().optional().error(handleValidationErrors),
      phone: Joi.string().optional().error(handleValidationErrors),
      address: Joi.string().optional().error(handleValidationErrors),
      gender: Joi.string()
        .valid(...genderEnum)
        .required()
        .error(handleValidationErrors),
      role: Joi.required().error(handleValidationErrors),
      image: Joi.string().optional().error(handleValidationErrors),
    }),
  },
  updateUser: {
    body: Joi.object({
      firstName: Joi.string().optional().error(handleValidationErrors),
      lastName: Joi.string().optional().error(handleValidationErrors),
      phone: Joi.string().optional().error(handleValidationErrors),
      address: Joi.string().optional().error(handleValidationErrors),
      gender: Joi.string()
        .valid(...genderEnum)
        .optional()
        .error(handleValidationErrors),
      image: Joi.string().optional().error(handleValidationErrors),
    }),
  },
  updateUserByAdmin: {
    body: Joi.object({
      firstName: Joi.string().optional().error(handleValidationErrors),
      lastName: Joi.string().optional().error(handleValidationErrors),
      phone: Joi.string().optional().error(handleValidationErrors),
      address: Joi.string().optional().error(handleValidationErrors),
      gender: Joi.string()
        .valid(...genderEnum)
        .optional()
        .error(handleValidationErrors),
      role: Joi.optional().error(handleValidationErrors),
      image: Joi.string().optional().error(handleValidationErrors),
    }),
  },
};
