import express from 'express';
import roleController from '../../controllers/user/role.controller';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import constants from '../../constants';

const router = express.Router();
const model = constants.PERMISSION.MODEL.ROLE;

/**
 * @swagger
 * tags:
 *   - name: Role
 *     description: Endpoints related to Role management
 */

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Internal server error
 */
router.get('/', checkPermission(model), roleController.list);
/**
 * @swagger
 * /role:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Admin
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/', checkPermission(model), roleController.create);
/**
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Get Role details by ID
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Successfully retrieved Role details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update a role by ID
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the role to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Moderator
 *     responses:
 *       200:
 *         description: Updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete Role by ID
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', checkPermission(model), roleController.detail);
router.put('/:id', checkPermission(model), roleController.update);
router.delete('/:id', checkPermission(model), roleController.remove);

export default router;
