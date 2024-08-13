import express from 'express';
import wishlistController from '../../controllers/wishlist/wishlist.controller';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import constants from '../../constants';
import wishlistSchema from '../../validations/schemas/wishlist/wishlist.schema';
const schemaValidator = require('express-joi-validator');

const router = express.Router();

const model = constants.PERMISSION.MODEL.CART;

/**
 * @swagger
 * tags:
 *   - name: Wishlist
 *     description: Endpoints related to Wishlist
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     tags:
 *       - Wishlist
 *     summary: Get list of Wishlists
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
 *         description: Wishlist list retrieved successfully
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
 *                     $ref: '#/components/schemas/Wishlist'
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
router.get('/', checkPermission(model), wishlistController.list);

/**
 * @swagger
 * /wishlist/{id}:
 *   get:
 *     tags:
 *       - Wishlist
 *     summary: Get a Wishlist by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wishlist ID
 *     responses:
 *       200:
 *         description: Wishlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       404:
 *         description: Wishlist not found
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
 *                       example: "Wishlist not found"
 */
router.get('/:id', wishlistController.getById);

/**
 * @swagger
 * /wishlist/{id}:
 *   delete:
 *     tags:
 *       - Wishlist
 *     summary: Delete a Wishlist by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wishlist ID
 *     responses:
 *       204:
 *         description: Wishlist deleted successfully
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
router.delete('/:id', wishlistController.remove);

/**
 * @swagger
 * /wishlist:
 *   post:
 *     tags:
 *       - Wishlist
 *     summary: Add or remove a product from the wishlist
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
 *     responses:
 *       201:
 *         description: Product added to wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Wishlist'
 *                 message:
 *                   type: string
 *                   example: "Product added to wishlist"
 *       202:
 *         description: Product removed from wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Wishlist'
 *                 message:
 *                   type: string
 *                   example: "Product removed from wishlist"
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
router.post(
  '/',
  schemaValidator(wishlistSchema.addToWishlist),
  wishlistController.create,
);

export default router;
