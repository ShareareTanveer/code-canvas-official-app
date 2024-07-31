/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserDTO:
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
 *         role:
 *           type: number
 *           description: User role ID
 *           required: true
 *         image:
 *           type: string
 *           format: binary
 *           required: false
 *     UpdateUserDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: User ID
 *         firstName:
 *           type: string
 *           description: First name of the user
 *           required: false
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
 *           required: false
 *         image:
 *           type: string
 *           format: binary
 *           required: false
 *     UpdateUserByAdminDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: User ID
 *         firstName:
 *           type: string
 *           description: First name of the user
 *           required: false
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
 *           required: false
 *         role:
 *           type: number
 *           description: User role ID
 *           required: false
 *         image:
 *           type: string
 *           format: binary
 *           required: false
 *     SimpleUserResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: User ID
 *         firstName:
 *           type: string
 *           description: First name of the user
 *           required: false
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *           required: false
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *           required: false
 *         details:
 *           $ref: '#/components/schemas/UserDetailResponseDTO'
 *           description: User details
 *           required: false
 *         role:
 *           $ref: '#/components/schemas/SimpleRoleResponseDTO'
 *           description: User role
 *           required: false
 */
