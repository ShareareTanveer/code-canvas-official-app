import express from 'express';
import officeInfoController from '../../controllers/core/contact-us.controller';
import { validateDTO } from '../../middlewares/dto-validator.middleware';
import { CreateContactUsDTO, UpdateContactUsDTO } from '../../services/dto/core/contact-us.dto';
import { checkPermission } from '../../middlewares/authenticate.middleware';
import constants from '../../constants';
import contactUsSchema from '../../validations/schemas/core/contact-us.schema';
const schemaValidator = require('express-joi-validator');

const router = express.Router();
const model = constants.PERMISSION.MODEL.CONTACT_US


/**
 * @swagger
 * tags:
 *   - name: ContactUs
 *     description: Endpoints related to ContactUs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactUs:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         phone:
 *           type: string
 *           example: "123-456-7890"
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         address:
 *           type: string
 *           example: "address name"
 *         company:
 *           type: string
 *           example: "company name"
 *         subject:
 *           type: string
 *           example: "subject"
 *         message:
 *           type: string
 *           example: "message"
 *         fullName:
 *           type: string
 *           example: "fullName"
 */

/**
 * @swagger
 * /core/contact-us:
 *   get:
 *     tags:
 *       - ContactUs
 *     summary: Get list of ContactUs
 *     responses:
 *       200:
 *         description: ContactUs list retrieved successfully
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
 *                     $ref: '#/components/schemas/ContactUs'
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
router.get('/', checkPermission(model), officeInfoController.list);

/**
 * @swagger
 * /core/contact-us/{id}:
 *   get:
 *     tags:
 *       - ContactUs
 *     summary: Get a ContactUs by ID
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
 *         description: ContactUs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ContactUs'
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
router.get('/:id', checkPermission(model), officeInfoController.getById);

/**
 * @swagger
 * /core/contact-us/{id}:
 *   delete:
 *     tags:
 *       - ContactUs
 *     summary: Remove a ContactUs by ID
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
 *         description: ContactUs removed successfully
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
 * /core/contact-us:
 *   post:
 *     tags:
 *       - ContactUs
 *     summary: Create a new ContactUs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactUs'
 *     responses:
 *       201:
 *         description: ContactUs created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ContactUs'
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
router.post('/', schemaValidator(contactUsSchema.create), officeInfoController.create);

/**
 * @swagger
 * /core/contact-us/{id}:
 *   patch:
 *     summary: Update a ContactUs by ID
 *     tags:
 *       - ContactUs
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
 *             $ref: '#/components/schemas/ContactUs'
 *     responses:
 *       200:
 *         description: ContactUs updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ContactUs'
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
 *         description: ContactUs not found
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
router.patch('/:id', checkPermission(model), schemaValidator(contactUsSchema.update), officeInfoController.update);

export default router;
