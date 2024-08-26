import express from 'express';
import blogController from '../../controllers/blog/blog.controller';
import { upload } from '../../middlewares/multer.middleware';
import blogSchema from '../../validations/schemas/blog/blog.schema';
import { stringParser } from '../../middlewares/parser-form-data.middleware';
import { IsAdmin } from '../../decorators/role-permission.decorator';
const schemaValidator = require('express-joi-validator');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Blog
 *     description: Endpoints related to Blog
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Service Title"
 *         subtitle:
 *           type: string
 *           example: "Service Subtitle"
 *         slug:
 *           type: string
 *           example: "service-slug"
 *         description:
 *           type: string
 *           example: "Detailed service description"
 *         icon:
 *           type: string
 *           example: "icon.png"
 *         keyPoints:
 *           type: array
 *           items:
 *             type: string
 *           example: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["image1.png", "image2.png"]
 */

/**
 * @swagger
 * /blog:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get list of Blog
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
 *             - title
 *             - price
 *         description: Field to sort products by.
 *         examples:
 *           title:
 *             summary: Sort by product title
 *             value: title
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
 *         description: Blog list retrieved successfully
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
 *                     $ref: '#/components/schemas/Blog'
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
router.get('/', blogController.list);

/**
 * @swagger
 * /blog/{id}:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get a Blog by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Blog'
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
router.get('/:id', blogController.getById);

/**
 * @swagger
 * /blog/{id}:
 *   delete:
 *     tags:
 *       - Blog
 *     summary: Remove a Blog by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blog removed successfully
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
router.delete(
  '/:id',
  IsAdmin,
  blogController.remove,
);

/**
 * @swagger
 * /blog:
 *   post:
 *     tags:
 *       - Blog
 *     summary: Create a new Blog
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *               keyPoints:
 *                 type: array
 *                 items:
 *                   type: string
 *               faqs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Blog'
 *       409:
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
  upload.array('images'),
  IsAdmin,
  stringParser(),
  schemaValidator(blogSchema.create),
  blogController.create,
);

/**
 * @swagger
 * /blog/{id}:
 *   patch:
 *     summary: Update a Blog by ID
 *     tags:
 *       - Blog
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *               keyPoints:
 *                 type: array
 *                 items:
 *                   type: string
 *               faqs:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *               deleteImages:
 *                 type: array
 *                 items:
 *                   type: integer
 *               addImages:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Blog'
 *       400:
 *         description: Bad request
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
 *       404:
 *         description: Blog not found
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
 */
router.patch(
  '/:id',
  upload.array('addImages'),
  IsAdmin,
  stringParser(),
  schemaValidator(blogSchema.update),
  blogController.update,
);

export default router;
