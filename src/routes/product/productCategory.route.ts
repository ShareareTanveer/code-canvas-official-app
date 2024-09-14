import express from 'express';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import constants from '../../constants';
import productCategorySchema from '../../validations/schemas/product/productCategory.schema';
import productCategoryController from '../../controllers/product/productCategory.controller';
import { upload } from '../../middlewares/multer.middleware';
const schemaValidator = require('express-joi-validator');

const router = express.Router();
const model = constants.PERMISSION.MODEL.CATEGORY;

/**
 * @swagger
 * tags:
 *   - name: ProductCategory
 *     description: Endpoints related to ProductCategory
 */

/**
 * @swagger
 * /product-category:
 *   get:
 *     tags:
 *       - ProductCategory
 *     summary: Get list of ProductCategory
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword to filter products by title, slug, or productCategory name or tag name.
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: string
 *         description: set pagination to true if you want to use pagination.
 *       - in: query
 *         name: productCategory
 *         schema:
 *           type: string
 *         description: Filter data by productCategory name.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *         description: Field to sort data by.
 *         examples:
 *           name:
 *             summary: Sort by name
 *             value: name
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
 *         description: ProductCategory list retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 name: "ProductCategory"
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.get('/', productCategoryController.list);

/**
 * @swagger
 * /product-category/{id}:
 *   get:
 *     tags:
 *       - ProductCategory
 *     summary: Get a ProductCategory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: ProductCategory retrieved successfully
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.get('/:id', productCategoryController.getById);

/**
 * @swagger
 * /product-category/{id}:
 *   delete:
 *     tags:
 *       - ProductCategory
 *     summary: Get a ProductCategory
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: ProductCategory Removed successfully
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.delete(
  '/:id',
  checkPermission(model),
  productCategoryController.remove,
);

/**
 * @swagger
 * /product-category:
 *   post:
 *     tags:
 *       - ProductCategory
 *     summary: Create a new ProductCategory
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "ProductCategory"
 *               color:
 *                 type: string
 *                 example: "color"
 *               subtitle:
 *                 type: string
 *                 example: "subtitle"
 *               icon:
 *                 type: string
 *                 example: "icon"
 *     responses:
 *       201:
 *         description: productCategory created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 name: "ProductCategory"
 *       409:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.post(
  '/',
  upload.single('image'),
  checkPermission(model),
  schemaValidator(productCategorySchema.create),
  productCategoryController.create,
);

/**
 * @swagger
 * /product-category/{id}:
 *   patch:
 *     summary: Update a ProductCategory by ID
 *     tags: [ProductCategory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the ProductCategory to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Business Name
 *     responses:
 *       200:
 *         description: Updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: data not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  '/:id',
  upload.single('image'),
  checkPermission(model),
  schemaValidator(productCategorySchema.update),
  productCategoryController.update,
);

export default router;
