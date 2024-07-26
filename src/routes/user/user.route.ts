import express from 'express';
import userController from '../../controllers/user/user.controller';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { CreateUserDTO, UpdateUserByAdminDTO, UpdateUserDTO } from '../../services/dto/user/user.dto';
import { IsAdmin } from '../../decorators/role-permission.decorator';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Endpoints related to user management
 *   - name: Auth
 *     description: Endpoints related to authentication
 */

/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get current user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved current user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   patch:
 *     summary: Update current user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MeDTO'
 *     responses:
 *       200:
 *         description: Successfully updated current user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateDTO'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 *   patch:
 *     summary: Update current user details
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MeDTO'
 *     responses:
 *       200:
 *         description: Successfully updated current user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/me', userController.me);
router.patch('/me', validateDTO(UpdateUserDTO), userController.updateMe);

router.get('/', checkPermission("read","user"), userController.list);
router.post('/', checkPermission("create","user"), validateDTO(CreateUserDTO), userController.create);
router.get('/:id', checkPermission("read","user"), userController.detail);
router.patch('/:id', checkPermission("update","user"),validateDTO(UpdateUserByAdminDTO), userController.update);
router.delete('/:id',checkPermission("delete","user"), userController.remove);

export default router;
