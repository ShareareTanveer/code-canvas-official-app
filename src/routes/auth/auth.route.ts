import express from 'express';
import userController from '../../controllers/user/user.controller';
import { upload } from '../../middlewares/multer.middleware';
import authSchema from '../../validations/schemas/auth/auth.schema';
import userSchema from '../../validations/schemas/user/user.schema';
const schemaValidator = require('express-joi-validator');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPassword123!"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Anytown, USA"
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *                 example: "Male"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 email: "user@example.com"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *                 phone: "+1234567890"
 *                 address: "123 Main St, Anytown, USA"
 *                 gender: "Male"
 *                 role: 1
 *       409:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Email already exists."
 */

router.post(
  '/register',
  upload.single('image'),
  schemaValidator(userSchema.registerUser),
  userController.register,
);

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify here
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 email: "user@example.com"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Invalid email or password"
 */
router.post('/verify-email', userController.verifyEmail);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login here
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPassword123!"
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 email: "user@example.com"
 *                 firstName: "John"
 *                 lastName: "Doe"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Invalid email or password"
 */
router.post(
  '/login',
  schemaValidator(authSchema.login),
  userController.login,
);

/**
 * @swagger
 * /auth/send-reset-password-email:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Send an OTP to the user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: "OTP sent successfully to your email"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Internal Server Error"
 */
router.post(
  '/send-reset-password-email',
  schemaValidator(authSchema.sendEmail),
  userController.sendResetPasswordEmail,
);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Change the user's password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "NewStrongPassword123!"
 *               confirmNewPassword:
 *                 type: string
 *                 format: password
 *                 example: "NewStrongPassword123!"
 *     responses:
 *       200:
 *         description: Changed password successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: "Password reset successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Password does not match"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Invalid or expired token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Internal Server Error"
 */
router.post(
  '/change-password',
  schemaValidator(authSchema.resetPassword),
  userController.resetPassword,
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout the user
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 message: "Logged out"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Internal Server Error"
 */
router.post('/logout', userController.logout);

export default router;
