import express from 'express';
import productController from '../../controllers/product/product.controller';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { CreateProductDTO, UpdateProductDTO } from '../../services/dto/product/product.dto';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         category:
 *           type: integer
 *           example: 2
 *         title:
 *           type: string
 *           example: "Product Title"
 *         slug:
 *           type: string
 *           example: "product-title"
 *         description:
 *           type: string
 *           example: "Product description here."
 *         price:
 *           type: number
 *           format: double
 *           example: 19.99
 *         live_link:
 *           type: string
 *           example: "http://example.com/product"
 *         support_for:
 *           type: string
 *           example: "6 months"
 *         is_documented:
 *           type: boolean
 *           example: true
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["image1.jpg", "image2.jpg"]
 *
 *     CreateProductDTO:
 *       type: object
 *       properties:
 *         category:
 *           type: integer
 *           example: 2
 *         title:
 *           type: string
 *           example: "Product Title"
 *         slug:
 *           type: string
 *           example: "product-title"
 *         description:
 *           type: string
 *           example: "Product description here."
 *         price:
 *           type: number
 *           format: double
 *           example: 19.99
 *         live_link:
 *           type: string
 *           example: "http://example.com/product"
 *         support_for:
 *           type: string
 *           example: "6 months"
 *         is_documented:
 *           type: boolean
 *           example: true
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["image1.jpg", "image2.jpg"]
 *
 *     UpdateProductDTO:
 *       type: object
 *       properties:
 *         category:
 *           type: integer
 *           example: 2
 *         title:
 *           type: string
 *           example: "Updated Product Title"
 *         slug:
 *           type: string
 *           example: "updated-product-title"
 *         description:
 *           type: string
 *           example: "Updated product description here."
 *         price:
 *           type: number
 *           format: double
 *           example: 29.99
 *         live_link:
 *           type: string
 *           example: "http://example.com/updated-product"
 *         support_for:
 *           type: string
 *           example: "1 year"
 *         is_documented:
 *           type: boolean
 *           example: false
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["updated_image1.jpg", "updated_image2.jpg"]
 */

/**
 * @swagger
 * /product:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get list of Products
 *     responses:
 *       200:
 *         description: Product list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.get('/', productController.list);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get a Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.get('/:id', productController.getById);

/**
 * @swagger
 * /product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create a new Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductDTO'
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Conflict error message"
 */
router.post('/', validateDTO(CreateProductDTO), productController.create);

/**
 * @swagger
 * /product/{id}:
 *   patch:
 *     tags:
 *       - Product
 *     summary: Update a Product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductDTO'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */
router.patch('/:id', validateDTO(UpdateProductDTO), productController.update);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete a Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product removed successfully
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.delete('/:id', productController.remove);

export default router;
