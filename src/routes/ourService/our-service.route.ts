import express from 'express';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { CreateOurServiceDTO, UpdateOurServiceDTO } from '../../services/dto/ourService/our-service.dto';
import ourServiceController from '../../controllers/ourService/our-service.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: OurService
 *     description: Endpoints related to OurService
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OurService:
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
 *             type: object
 *           example: [{"key": "value"}]
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["image1.png", "image2.png"]
 *         faqs:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 */

/**
 * @swagger
 * /our-service:
 *   get:
 *     tags:
 *       - OurService
 *     summary: Get list of OurService
 *     responses:
 *       200:
 *         description: OurService list retrieved successfully
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
 *                     $ref: '#/components/schemas/OurService'
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
router.get('/', ourServiceController.list);

/**
 * @swagger
 * /our-service/{id}:
 *   get:
 *     tags:
 *       - OurService
 *     summary: Get a OurService by ID
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
 *         description: OurService retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OurService'
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
router.get('/:id', ourServiceController.getById);

/**
 * @swagger
 * /our-service/{id}:
 *   delete:
 *     tags:
 *       - OurService
 *     summary: Remove a OurService by ID
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
 *         description: OurService removed successfully
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
router.delete('/:id', ourServiceController.remove);

/**
 * @swagger
 * /our-service:
 *   post:
 *     tags:
 *       - OurService
 *     summary: Create a new OurService
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OurService'
 *     responses:
 *       201:
 *         description: OurService created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OurService'
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
router.post('/', validateDTO(CreateOurServiceDTO), ourServiceController.create);

/**
 * @swagger
 * /our-service/{id}:
 *   patch:
 *     summary: Update a OurService by ID
 *     tags:
 *       - OurService
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
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OurService'
 *     responses:
 *       200:
 *         description: OurService updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OurService'
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
 *         description: OurService not found
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
  validateDTO(UpdateOurServiceDTO),
  ourServiceController.update,
);

export default router;
