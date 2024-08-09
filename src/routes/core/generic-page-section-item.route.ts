import express from 'express';
import genericPageSectionItemController from '../../controllers/core/generic-page-section-item.controller';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import {
  CreateGenericPageSectionItemDTO,
  UpdateGenericPageSectionItemDTO,
} from '../../services/dto/core/generic-page-section-item.dto';
import { upload } from '../../middlewares/multer.middleware';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import constants from '../../constants';
import { stringParser } from '../../middlewares/parser-form-data.middleware';
import genericPageSectionItemSchema from '../../validations/schemas/core/generic-page-section-item.schema';
const schemaValidator = require('express-joi-validator');

const router = express.Router();
const model = constants.PERMISSION.MODEL.GENERIC_PAGE_SECTION_ITEM;

/**
 * @swagger
 * tags:
 *   - name: GenericPageSectionItem
 *     description: Endpoints related to GenericPageSectionItem
 */

/**
 * @swagger
 * /core/generic-page-section-item:
 *   get:
 *     tags:
 *       - GenericPageSectionItem
 *     summary: Get list of GenericPageSectionItem
 *     responses:
 *       200:
 *         description: GenericPageSectionItem list retrieved successfully
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Sample Title"
 *                       subtitle:
 *                         type: string
 *                         example: "Sample Subtitle"
 *                       keyPoints:
 *                         type: array
 *                         items:
 *                           type: string
 *                           properties:
 *                             point:
 *                               type: string
 *                               example: "Key point"
 *                       description:
 *                         type: string
 *                         example: "Detailed description"
 *                       icon:
 *                         type: string
 *                         example: "icon-class"
 *                       image:
 *                         type: string
 *                         example: "http://example.com/image.png"
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
router.get('/', genericPageSectionItemController.list);

/**
 * @swagger
 * /core/generic-page-section-item/{id}:
 *   get:
 *     tags:
 *       - GenericPageSectionItem
 *     summary: Get a GenericPageSectionItem by ID
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
 *         description: GenericPageSectionItem retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Sample Title"
 *                     subtitle:
 *                       type: string
 *                       example: "Sample Subtitle"
 *                     keyPoints:
 *                       type: array
 *                       items:
 *                         type: string
 *                         properties:
 *                           point:
 *                             type: string
 *                             example: "Key point"
 *                     description:
 *                       type: string
 *                       example: "Detailed description"
 *                     icon:
 *                       type: string
 *                       example: "icon-class"
 *                     image:
 *                       type: string
 *                       example: "http://example.com/image.png"
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
router.get('/:id', genericPageSectionItemController.getById);

/**
 * @swagger
 * /core/generic-page-section-item/{id}:
 *   delete:
 *     tags:
 *       - GenericPageSectionItem
 *     summary: Remove a GenericPageSectionItem by ID
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
 *         description: GenericPageSectionItem removed successfully
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
  checkPermission(model),
  genericPageSectionItemController.remove,
);

/**
 * @swagger
 * /core/generic-page-section-item:
 *   post:
 *     tags:
 *       - GenericPageSectionItem
 *     summary: Create a new GenericPageSectionItem
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Sample Title"
 *               subtitle:
 *                 type: string
 *                 example: "Sample Subtitle"
 *               keyPoints:
 *                 type: array
 *                 items:
 *                   type: string
 *                   properties:
 *                     point:
 *                       type: string
 *                       example: "Key point"
 *               description:
 *                 type: string
 *                 example: "Detailed description"
 *               icon:
 *                 type: string
 *                 example: "icon-class"
 *               image:
 *                 type: string
 *                 format: binary
 *               genericPageSection:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: GenericPageSectionItem created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Sample Title"
 *                     subtitle:
 *                       type: string
 *                       example: "Sample Subtitle"
 *                     keyPoints:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           point:
 *                             type: string
 *                             example: "Key point"
 *                     description:
 *                       type: string
 *                       example: "Detailed description"
 *                     icon:
 *                       type: string
 *                       example: "icon-class"
 *                     image:
 *                       type: string
 *                       example: "http://example.com/image.png"
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
  checkPermission(model),
  upload.single('image'),
  stringParser(),
  schemaValidator(genericPageSectionItemSchema.create),
  genericPageSectionItemController.create,
);

/**
 * @swagger
 * /core/generic-page-section-item/{id}:
 *   patch:
 *     summary: Update a GenericPageSectionItem by ID
 *     tags:
 *       - GenericPageSectionItem
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
 *                 example: "Updated Title"
 *               subtitle:
 *                 type: string
 *                 example: "Updated Subtitle"
 *               keyPoints:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     point:
 *                       type: string
 *                       example: "Updated key point"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               icon:
 *                 type: string
 *                 example: "updated-icon-class"
 *               image:
 *                 type: string
 *                 format: binary
 *               genericPageSection:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: GenericPageSectionItem updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Updated Title"
 *                     subtitle:
 *                       type: string
 *                       example: "Updated Subtitle"
 *                     keyPoints:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           point:
 *                             type: string
 *                             example: "Updated key point"
 *                     description:
 *                       type: string
 *                       example: "Updated description"
 *                     icon:
 *                       type: string
 *                       example: "updated-icon-class"
 *                     image:
 *                       type: string
 *                       example: "http://example.com/updated-image.png"
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
 *         description: GenericPageSectionItem not found
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
router.patch(
  '/:id',
  checkPermission(model),
  upload.single('image'),
  stringParser(),
  schemaValidator(genericPageSectionItemSchema.update),
  genericPageSectionItemController.update,
);

export default router;
