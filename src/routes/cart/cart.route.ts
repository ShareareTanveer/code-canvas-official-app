import express from 'express';
import cartController from '../../controllers/cart/cart.controller';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { AddToCartDTO } from '../../services/dto/cart/cart.dto';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Endpoints related to Cart
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Get list of Carts
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword to filter products by title, slug, or category name or tag name.
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: string
 *         description: set pagination to true if you want to use pagination.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category name.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum:
 *             - id
 *             - price
 *         description: Field to sort products by. 
 *         examples:
 *           id:
 *             summary: Sort by product id
 *             value: id
 *           price:
 *             summary: Sort by product price
 *             value: price
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum:
 *             - ASC
 *             - DESC
 *         description: Sort order. 
 *         examples:
 *           ASC:
 *             summary: Sort in ascending order
 *             value: ASC
 *           DESC:
 *             summary: Sort in descending order
 *             value: DESC
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of products to return.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination.
 *     responses:
 *       200:
 *         description: Cart list retrieved successfully
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
 *                     $ref: '#/components/schemas/Cart'
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
router.get('/', cartController.list);

/**
 * @swagger
 * /cart/{id}:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Get a Cart by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
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
 *                       example: "Cart not found"
 */
router.get('/:id', cartController.getById);

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Delete a Cart by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     responses:
 *       204:
 *         description: Cart deleted successfully
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
router.delete('/:id', cartController.remove);

/**
 * @swagger
 * /cart:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add or remove a product from the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: integer
 *                 example: 1
 *               cartId:
 *                 type: string
 *                 example: asfiluaeg7863bjkbk
 *     responses:
 *       201:
 *         description: Product added to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *                 message:
 *                   type: string
 *                   example: "Product added to cart"
 *       202:
 *         description: Product removed from cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *                 message:
 *                   type: string
 *                   example: "Product removed from cart"
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
router.post('/', validateDTO(AddToCartDTO), cartController.create);

export default router;
