import express from 'express';
import categoryController from '../../controllers/category/category.controller';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../../services/dto/category/category.dto';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Category
 *     description: Endpoints related to Category
 */

/**
 * @swagger
 * /category:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get list of Category
 *     responses:
 *       200:
 *         description: Category list retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 name: "Category"
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.get('/', categoryController.list);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get a Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.get('/:id', categoryController.getById);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Get a Category
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Category Removed successfully
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.delete('/:id', categoryController.remove);

/**
 * @swagger
 * /category:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create a new Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Category"
 *     responses:
 *       201:
 *         description: category created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 name: "Category"
 *       409:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.post('/', validateDTO(CreateCategoryDTO), categoryController.create);

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: Update a Category by ID
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
  validateDTO(UpdateCategoryDTO),
  categoryController.update,
);

export default router;
