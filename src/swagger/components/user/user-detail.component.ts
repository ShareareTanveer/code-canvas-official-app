/**
 * @swagger
 * components:
 *   schemas:
 *     UserDetailResponseDTO:
 *       type: object
 *       properties:
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
 *           required: false
 *         image:
 *           type: string
 *           description: User profile image URL
 *           required: false
 */