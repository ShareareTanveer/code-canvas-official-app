
/**
 * @swagger
 * components:
 *   schemas:
 *     SimpleRoleResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Role ID
 *         name:
 *           type: string
 *           description: Role name
 *           required: true
 *     RoleResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Role ID
 *         name:
 *           type: string
 *           description: Role name
 *           required: true
 *         permissions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PermissionResponseDTO'
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SimpleUserResponseDTO'
 */