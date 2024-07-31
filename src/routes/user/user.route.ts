import express from 'express';
import userController from '../../controllers/user/user.controller';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import {
  CreateUserDTO,
  UpdateUserByAdminDTO,
  UpdateUserDTO,
} from '../../services/dto/user/user.dto';
import { IsAdmin } from '../../decorators/role-permission.decorator';
import { upload } from '../../middlewares/multer.middleware';

const router = express.Router();
router.get('/me', userController.me);
router.patch(
  '/me',
  upload.single('image'),
  validateDTO(UpdateUserDTO),
  userController.updateMe,
);
router.get('/', checkPermission('read', 'user'), userController.list);
router.post(
  '/',
  // checkPermission('create', 'user'),
  upload.single('image'),
  validateDTO(CreateUserDTO),
  userController.create,
);
router.get(
  '/:id',
  checkPermission('read', 'user'),
  userController.detail,
);
router.patch(
  '/:id',
  // checkPermission('update', 'user'),
  upload.single('image'),
  validateDTO(UpdateUserByAdminDTO),
  userController.update,
);
router.delete(
  '/:id',
  checkPermission('delete', 'user'),
  userController.remove,
);

export default router;
