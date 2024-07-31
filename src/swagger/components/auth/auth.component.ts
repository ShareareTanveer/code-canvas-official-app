/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUserDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: User ID
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *           required: true
 *         password:
 *           type: string
 *           description: User password
 *           required: true
 *         firstName:
 *           type: string
 *           description: First name of the user
 *           required: true
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *           required: false
 *         phone:
 *           type: string
 *           description: User phone number
 *           required: false
 *         address:
 *           type: string
 *           description: User address
 *           required: false
 *         gender:
 *           type: string
 *           description: User gender
 *           enum: ['male', 'female', 'other']
 *           required: true
 *         image:
 *           type: string
 *           format: binary
 *           required: false
 *     LoginDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *           required: true
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           required: true
 *           example: StrongPassword123!
 *     SendEmailOtpDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *           required: true
 *     VerifyEmailOtpDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *           required: true
 *         otp:
 *           type: integer
 *           description: otp
 *           required: true 
 *     ResetPasswordDTO:
 *       type: object
 *       properties:
 *         newPassword:
 *           type: string
 *           format: password
 *           description: new password
 *           required: true
 *           example: NewStrongPassword123!
 *         confirmNewPassword:
 *           type: string
 *           format: password
 *           description: confirm password
 *           required: true
 *           example: NewStrongPassword123!
 */
