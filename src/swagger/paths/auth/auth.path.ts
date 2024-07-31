/**
 * @swagger
 * paths:
 *   /auth/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/RegisterUserDTO'
 *       responses:
 *         201:
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/SimpleUserResponseDTO'
 *         400:
 *           description: Invalid input
 *   /auth/login:
 *     post:
 *       summary: Login a user
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginDTO'
 *       responses:
 *         200:
 *           description: User logged in successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     description: Authentication token
 *         400:
 *           description: Invalid credentials
 *   /auth/send-email-otp:
 *     post:
 *       summary: Send email OTP
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendEmailOtpDTO'
 *       responses:
 *         200:
 *           description: OTP sent successfully
 *         400:
 *           description: Invalid input
 *   /auth/verify-email-otp:
 *     post:
 *       summary: Verify email OTP
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerifyEmailOtpDTO'
 *       responses:
 *         200:
 *           description: OTP verified successfully
 *         400:
 *           description: Invalid OTP
 *   /auth/change-password:
 *     post:
 *       summary: Change password
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPasswordDTO'
 *       responses:
 *         200:
 *           description: Password changed successfully
 *         400:
 *           description: Invalid input
 *   /auth/logout:
 *     post:
 *       summary: Logout user
 *       tags: [Auth]
 *       responses:
 *         200:
 *           description: User logged out successfully
 */