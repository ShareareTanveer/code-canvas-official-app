import express from 'express';
import paymentController from '../../controllers/order/bkash-payment.controller';
import orderSchema from '../../validations/schemas/order/order.schema';
const schemaValidator = require('express-joi-validator');

const router = express.Router();




/**
 * @swagger
 * /payment/bkash/create:
 *   post:
 *     tags:
 *       - Order
 *     summary: Create a new Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 description: The ID of the cart to create an order from
 *                 example: "c8a4e28c-4c55-4e8d-86b6-3f96d290b6e4"
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponseDTO'
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Error message"
 */
router.post('/bkash/create',  schemaValidator(orderSchema.create), paymentController.createPayment)
router.get('/bkash/callback', paymentController.handleCallback)
router.get('/bkash/refund/:trxID', paymentController.processRefund)

export default router