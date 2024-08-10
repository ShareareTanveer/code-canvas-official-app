import express from 'express';
import tagController from '../../controllers/tag/tag.controller';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import constants from '../../constants';
import tagSchema from '../../validations/schemas/tag/tag.schema';
const schemaValidator = require('express-joi-validator');

const router = express.Router();
const model = constants.PERMISSION.MODEL.TAG;

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
router.delete('/:id', checkPermission(model), tagController.remove);

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
router.post(
  '/',
  checkPermission(model),
  schemaValidator(tagSchema.create),
    tagController.create,
);

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
  checkPermission(model),
  schemaValidator(tagSchema.update),
    tagController.update,
);

export default router;
