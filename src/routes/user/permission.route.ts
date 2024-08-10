import express from 'express';
import permissionController from '../../controllers/user/permission.controller';
// import { validateDTO } from '../../middlewares/dto-validator.middleware';
// import { CreatePermissionDTO, UpdatePermissionDTO } from '../../services/dto/permission/create-update-permission.dto';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Permission
 *     description: Endpoints related to Permission management
 */

/**
 * @swagger
 * /permission:
 *   get:
 *     summary: Get all permission
 *     tags: [Permission]
 *     responses:
 *       200:
 *         description: List of permission
 *       500:
 *         description: Internal server error
 */
router.get('/', permissionController.list);
router.post(
  '/',
  // validateDTO(CreatePermissionDTO),
  permissionController.create,
);
router.patch(
  '/:id',
  // validateDTO(UpdatePermissionDTO),
  permissionController.update,
);
export default router;
