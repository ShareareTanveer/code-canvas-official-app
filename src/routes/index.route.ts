import * as express from 'express';

import defaultRouter from './default/default.route';
import authRouter from './auth/auth.route';
import userRouter from './user/user.route';
import roleRouter from './user/role.route';
import permissionRouter from './user/permission.route';
import categoryRouter from './category/category.route';
import productRouter from './product/product.route';
import tagRouter from './tag/tag.route';
import reviewRouter from './review/review.route';


const router = express.Router();

router.use('/', defaultRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/permission', permissionRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/tag', tagRouter);
router.use('/review', reviewRouter);

export default router;
