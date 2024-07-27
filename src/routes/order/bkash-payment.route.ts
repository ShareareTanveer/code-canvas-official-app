import express from 'express';
import paymentController from '../../controllers/order/bkash-payment.controller';

const router = express.Router();

router.post('/bkash/create', paymentController.createPayment)
router.get('/bkash/callback', paymentController.handleCallback)
router.get('/bkash/refund/:trxID', paymentController.processRefund)

export default router