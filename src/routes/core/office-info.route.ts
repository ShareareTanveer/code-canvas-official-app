import express from 'express';
import officeInfoController from '../../controllers/core/office-info.controller';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { CreateOfficeInfoDTO, UpdateOfficeInfoDTO } from '../../services/dto/core/office-info.dto';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import constants from '../../constants';

const router = express.Router();
const model = constants.PERMISSION.MODEL.OFFICE_INFO


/**
 * @swagger
 * tags:
 *   - name: OfficeInfo
 *     description: Endpoints related to OfficeInfo
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OfficeInfo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         phone:
 *           type: string
 *           example: "123-456-7890"
 *         supportEmail:
 *           type: string
 *           example: "support@example.com" 
 *         officialEmail:
 *           type: string
 *           example: "official@example.com"
 *         supportPhone:
 *           type: string
 *           example: "987-654-3210"
 *         ownerName:
 *           type: string
 *           example: "John Doe"
 *         brandName:
 *           type: string
 *           example: "BrandX"
 *         workingDayAndTime:
 *           type: string
 *           example: "Mon to Sat: 8am-9pm"
 *         closedDay:
 *           type: string
 *           example: "Sunday: Closed"
 *         bin:
 *           type: string
 *           example: "123456789"
 *         hotline:
 *           type: string
 *           example: "1800-123-456"
 *         officeAddress:
 *           type: string
 *           example: "123 Main St, City, Country"
 *         secondaryOfficeAddress:
 *           type: string
 *           example: "456 Secondary St, City, Country"
 *         latitude:
 *           type: number
 *           example: 23.810331
 *         longitude:
 *           type: number
 *           example: 90.412521
 */

/**
 * @swagger
 * /core/office-info:
 *   get:
 *     tags:
 *       - OfficeInfo
 *     summary: Get list of OfficeInfo
 *     responses:
 *       200:
 *         description: OfficeInfo list retrieved successfully
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
 *                     $ref: '#/components/schemas/OfficeInfo'
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
router.get('/', officeInfoController.list);

/**
 * @swagger
 * /core/office-info/{id}:
 *   get:
 *     tags:
 *       - OfficeInfo
 *     summary: Get a OfficeInfo by ID
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
 *         description: OfficeInfo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OfficeInfo'
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
router.get('/:id', officeInfoController.getById);

/**
 * @swagger
 * /core/office-info/{id}:
 *   delete:
 *     tags:
 *       - OfficeInfo
 *     summary: Remove a OfficeInfo by ID
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
 *         description: OfficeInfo removed successfully
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
router.delete('/:id', checkPermission(model), officeInfoController.remove);

/**
 * @swagger
 * /core/office-info:
 *   post:
 *     tags:
 *       - OfficeInfo
 *     summary: Create a new OfficeInfo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OfficeInfo'
 *     responses:
 *       201:
 *         description: OfficeInfo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OfficeInfo'
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
router.post('/', checkPermission(model), validateDTO(CreateOfficeInfoDTO), officeInfoController.create);

/**
 * @swagger
 * /core/office-info/{id}:
 *   patch:
 *     summary: Update a OfficeInfo by ID
 *     tags:
 *       - OfficeInfo
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
 *             $ref: '#/components/schemas/OfficeInfo'
 *     responses:
 *       200:
 *         description: OfficeInfo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OfficeInfo'
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
 *         description: OfficeInfo not found
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
router.patch('/:id', checkPermission(model), validateDTO(UpdateOfficeInfoDTO), officeInfoController.update);

export default router;
