import express from 'express';
import orderController from '../../controllers/order/order.controller';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { CreateOrderDTO, UpdateOrderDTO } from '../../services/dto/order/order.dto';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import constants from '../../constants';

const router = express.Router();
const model = constants.PERMISSION.MODEL.ORDER

/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: Endpoints related to Order
 */

/**
 * @swagger
 * /order:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get list of Orders
 *     responses:
 *       200:
 *         description: Order list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OrderResponseDTO'
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
router.get('/', orderController.list);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     tags:
 *       - Order
 *     summary: Get a specific Order by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Order to retrieve
 *     responses:
 *       200:
 *         description: Order retrieved successfully
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
router.get('/:id', orderController.getById);

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     tags:
 *       - Order
 *     summary: Delete an Order by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Order to delete
 *     responses:
 *       200:
 *         description: Order removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
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
router.delete('/:id', checkPermission(model), orderController.remove);

/**
 * @swagger
 * /order:
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
router.post('/', validateDTO(CreateOrderDTO), orderController.create);

/**
 * @swagger
 * /order/{id}:
 *   patch:
 *     summary: Update an Order by ID
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 description: The ID of the cart to update the order from
 *                 example: "c8a4e28c-4c55-4e8d-86b6-3f96d290b6e4"
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponseDTO'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', checkPermission(model), validateDTO(UpdateOrderDTO), orderController.update);

export default router;
