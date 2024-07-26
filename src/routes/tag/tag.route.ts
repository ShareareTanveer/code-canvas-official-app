import express from 'express';
import tagController from '../../controllers/tag/tag.controller';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { CreateTagDTO, UpdateTagDTO } from '../../services/dto/tag/tag.dto';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Tag
 *     description: Endpoints related to Tag
 */

/**
 * @swagger
 * /tag:
 *   get:
 *     tags:
 *       - Tag
 *     summary: Get list of Tag
 *     responses:
 *       200:
 *         description: Tag list retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 name: "Tag"
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.get('/', tagController.list);

/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     tags:
 *       - Tag
 *     summary: Get a Tag
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Tag retrieved successfully
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.get('/:id', tagController.getById);

/**
 * @swagger
 * /tag/{id}:
 *   delete:
 *     tags:
 *       - Tag
 *     summary: Get a Tag
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Tag Removed successfully
 *       400:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.delete('/:id', tagController.remove);

/**
 * @swagger
 * /tag:
 *   post:
 *     tags:
 *       - Tag
 *     summary: Create a new Tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tag"
 *     responses:
 *       201:
 *         description: tag created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 name: "Tag"
 *       409:
 *         description: Error Response
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error:
 *                 message: "Error message"
 */
router.post('/', validateDTO(CreateTagDTO), tagController.create);

/**
 * @swagger
 * /tag/{id}:
 *   patch:
 *     summary: Update a Tag by ID
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the Tag to update
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
  validateDTO(UpdateTagDTO),
  tagController.update,
);

export default router;
