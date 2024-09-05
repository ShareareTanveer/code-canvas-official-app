import * as express from 'express';

import defaultRouter from './default/default.route';
import authRouter from './auth/auth.route';
import userRouter from './user/user.route';
import customerRouter from './customer/customer.route';
import roleRouter from './user/role.route';
import permissionRouter from './user/permission.route';
import categoryRouter from './category/category.route';
import productRouter from './product/product.route';
import tagRouter from './tag/tag.route';
import reviewRouter from './review/review.route';
import cartRouter from './cart/cart.route';
import orderRouter from './order/order.route';
import ourServiceRouter from './ourService/our-service.route';
import paymentRouter from './order/bkash-payment.route';
import genericPageSectionItemRouter from './core/generic-page-section-item.route';
import genericPageSectionRouter from './core/generic-page-section.route';
import officeInfoRouter from './core/office-info.route';
import contactUsRouter from './core/contact-us.route';
import mainWebsitePageRouter from './core/main-website-page.route';
import blogRouter from './blog/blog.route';


const router = express.Router();

router.use('/', defaultRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/customer', customerRouter);
router.use('/role', roleRouter);
router.use('/permission', permissionRouter);
router.use('/category', categoryRouter);
router.use('/blog', blogRouter);
router.use('/product', productRouter);
router.use('/tag', tagRouter);
router.use('/review', reviewRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/payment', paymentRouter);
router.use('/our-service', ourServiceRouter);
router.use('/core/generic-page-section-item', genericPageSectionItemRouter);
router.use('/core/generic-page-section', genericPageSectionRouter);
router.use('/core/office-info', officeInfoRouter);
router.use('/core/contact-us', contactUsRouter);
router.use('/core/main-website-page', mainWebsitePageRouter);

export default router;
