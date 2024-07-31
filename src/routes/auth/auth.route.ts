import express from 'express';
import userController from '../../controllers/user/user.controller';
import {
  loginDTO,
  resetPasswordDTO,
  sendEmailOtpDTO,
  verifyEmailOtpDTO,
} from '../../services/dto/auth/auth.dto';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { RegisterUserDTO } from '../../services/dto/user/user.dto';
import { upload } from '../../middlewares/multer.middleware';

const router = express.Router();

router.post(
  '/register',
  upload.single('image'),
  validateDTO(RegisterUserDTO),
  userController.register,
);

router.post('/login', validateDTO(loginDTO), userController.login);

router.post(
  '/send-email-otp',
  validateDTO(sendEmailOtpDTO),
  userController.sendEmailOtp,
);
router.post(
  '/verify-email-otp',
  validateDTO(verifyEmailOtpDTO),
  userController.verifyEmailOtp,
);
router.post(
  '/change-password',
  validateDTO(resetPasswordDTO),
  userController.resetPassword,
);
router.post('/logout', userController.logout);

export default router;
