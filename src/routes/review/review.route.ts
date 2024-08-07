import express from 'express';
import reviewController from '../../controllers/review/review.controller';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { CreateReviewDTO, UpdateReviewDTO } from '../../services/dto/review/review.dto';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import constants from '../../constants';

const router = express.Router();
const model = constants.PERMISSION.MODEL.REVIEW

/**
 * @swagger
 * tags:
 *   - name: Review
 *     description: Endpoints related to reviews
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewResponseDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         product:
 *           $ref: '#/components/schemas/ProductResponseDTO'
 *         user:
 *           $ref: '#/components/schemas/SimpleUserResponseDTO'
 *         text:
 *           type: string
 *         rating:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5]
 *     CreateReviewDTO:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: "Great product!"
 *         rating:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5]
 *           example: 4
 *         product:
 *           type: integer
 *           example: 1
 *     UpdateReviewDTO:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: "Updated review text."
 *         rating:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5]
 *           example: 5
 */

/**
 * @swagger
 * /review:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get a list of reviews
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of reviews to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: product
 *         schema:
 *           type: string
 *         description: Filter by product ID
 *     responses:
 *       200:
 *         description: List of reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ReviewResponseDTO'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *       400:
 *         description: Bad request
 */
router.get('/', reviewController.list);

/**
 * @swagger
 * /review/{id}:
 *   get:
 *     tags:
 *       - Review
 *     summary: Get a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the review
 *     responses:
 *       200:
 *         description: Review retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewResponseDTO'
 *       404:
 *         description: Review not found
 */
router.get('/:id', reviewController.getById);

/**
 * @swagger
 * /review:
 *   post:
 *     tags:
 *       - Review
 *     summary: Create a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReviewDTO'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewResponseDTO'
 *       400:
 *         description: Bad request
 */
router.post('/', validateDTO(CreateReviewDTO), reviewController.create);

/**
 * @swagger
 * /review/{id}:
 *   patch:
 *     tags:
 *       - Review
 *     summary: Update a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the review to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReviewDTO'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReviewResponseDTO'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Review not found
 */
router.patch('/:id', checkPermission(model), validateDTO(UpdateReviewDTO), reviewController.update);

/**
 * @swagger
 * /review/{id}:
 *   delete:
 *     tags:
 *       - Review
 *     summary: Delete a review by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete('/:id', checkPermission(model), reviewController.remove);

export default router;
