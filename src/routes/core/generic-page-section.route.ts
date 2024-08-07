import express from 'express';
import genericPageSectionController from '../../controllers/core/generic-page-section.controller';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import {
  CreateGenericPageSectionDTO,
  UpdateGenericPageSectionDTO,
} from '../../services/dto/core/generic-page-section.dto';
import { upload } from '../../middlewares/multer.middleware';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import constants from '../../constants';

const router = express.Router();
const model = constants.PERMISSION.MODEL.GENERIC_PAGE_SECTION

/**
 * @swagger
 * tags:
 *   - name: GenericPageSection
 *     description: Endpoints related to GenericPageSection
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GenericPageSection:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Sample Title"
 *         subtitle:
 *           type: string
 *           example: "Sample Subtitle"
 *         keyPoints:
 *           type: array
 *           items:
 *             type: string
 *             properties:
 *               point:
 *                 type: string
 *                 example: "Key point"
 *         description:
 *           type: string
 *           example: "Detailed description"
 *         icon:
 *           type: string
 *           example: "icon-class"
 *         image:
 *           type: string
 *           example: "http://example.com/image.png"
 *         genericPageSection:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /core/generic-page-section:
 *   get:
 *     tags:
 *       - GenericPageSection
 *     summary: Get list of GenericPageSection
 *     responses:
 *       200:
 *         description: GenericPageSection list retrieved successfully
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
 *                     $ref: '#/components/schemas/GenericPageSection'
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
router.get('/', genericPageSectionController.list);

/**
 * @swagger
 * /core/generic-page-section/{id}:
 *   get:
 *     tags:
 *       - GenericPageSection
 *     summary: Get a GenericPageSection by ID
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
 *         description: GenericPageSection retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GenericPageSection'
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
router.get('/:id', genericPageSectionController.getById);

/**
 * @swagger
 * /core/generic-page-section/{id}:
 *   delete:
 *     tags:
 *       - GenericPageSection
 *     summary: Remove a GenericPageSection by ID
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
 *         description: GenericPageSection removed successfully
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
router.delete('/:id', checkPermission(model), genericPageSectionController.remove);

/**
 * @swagger
 * /core/generic-page-section:
 *   post:
 *     tags:
 *       - GenericPageSection
 *     summary: Create a new GenericPageSection
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
 *               sectionName:
 *                 type: string
 *                 example: "Hero"
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
 *                 example: [string]
 *               description:
 *                 type: string
 *                 example: "Detailed description"
 *               icon:
 *                 type: string
 *                 example: "icon-class"
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: GenericPageSection created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GenericPageSection'
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
router.post('/', checkPermission(model), upload.single('image'), validateDTO(CreateGenericPageSectionDTO), genericPageSectionController.create);


/**
 * @swagger
 * /core/generic-page-section/{id}:
 *   patch:
 *     summary: Update a GenericPageSection by ID
 *     tags:
 *       - GenericPageSection
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
 *               sectionName:
 *                 type: string
 *                 example: "FAQ"
 *               subtitle:
 *                 type: string
 *                 example: "Updated Subtitle"
 *               keyPoints:
 *                 type: array
 *                 items:
 *                   type: string
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
 *         description: GenericPageSection updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GenericPageSection'
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
 *         description: GenericPageSection not found
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
router.patch('/:id', checkPermission(model), upload.single('image'), validateDTO(UpdateGenericPageSectionDTO), genericPageSectionController.update);
 
export default router;
