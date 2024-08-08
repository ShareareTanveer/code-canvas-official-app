import joi from 'joi';
import { handleValidationErrors } from '../../../utilities/joi-validator-message.utility';


export default {
    sendEmail: {
      body: joi.object({
        email: joi.string()
          .email()
          .required()
          .error(handleValidationErrors),
      }),
    },
    resetPassword: {
      body: joi.object({
        newPassword: joi.string()
          .min(8)
          .max(50)
          .required()
          .error(handleValidationErrors),
        confirmNewPassword: joi.string()
          .valid(joi.ref('newPassword'))
          .required()
          .error(handleValidationErrors),
      }),
    },
    login: {
      body: joi.object({
        email: joi.string()
          .email()
          .required()
          .error(handleValidationErrors),
        password: joi.string()
          .required()
          .error(handleValidationErrors),
      }),
    },
  };