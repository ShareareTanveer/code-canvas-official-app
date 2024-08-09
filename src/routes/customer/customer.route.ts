import express from 'express';
import customerController from '../../controllers/customer/customer.controller';
import { upload } from '../../middlewares/multer.middleware';
import { stringParser } from '../../middlewares/parser-form-data.middleware';
import customerSchema from '../../validations/schemas/customer/customer.schema';
const schemaValidator = require('express-joi-validator');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Customer
 *     description: Endpoints related to Customer
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         nidNumber:
 *           type: string
 *           example: "123456789"
 *         passportAttachment:
 *           type: string
 *           format: binary
 *         otherAttachment:
 *           type: string
 *           format: binary
 *         tradeLicenseAttachment:
 *           type: string
 *           format: binary
 *         tinAttachment:
 *           type: string
 *           format: binary
 *         logo:
 *           type: string
 *           format: binary
 *         company:
 *           $ref: '#/components/schemas/CustomerCompanyResponseDTO'
 *         contactPerson:
 *           $ref: '#/components/schemas/CustomerContactPersonResponseDTO'
 *     CustomerContactPersonResponseDTO:
 *       type: object
 *       properties:
 *         fullName:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "johndoe@example.com"
 *         gender:
 *           type: string
 *           enum: [Male, Female, Other]
 *           example: "Male"
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         designation:
 *           type: string
 *           example: "designation"
 *     CustomerCompanyResponseDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Tech Solutions Ltd."
 *         city:
 *           type: string
 *           example: "John Doe"
 *         tradeLicenseNo:
 *           type: string
 *           example: "tradeLicenseNo"
 *         tinNo:
 *           type: string
 *           example: "tinNo"
 *         postCode:
 *           type: string
 *           example: "postCode"
 *         email:
 *           type: string
 *           example: "johndoe@example.com"
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         address:
 *           type: string
 *           example: "1234 Elm Street, Springfield"
 */

/**
 * @swagger
 * /customer:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get list of Customers
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search keyword to filter customers by name.
 *       - in: query
 *         name: pagination
 *         schema:
 *           type: boolean
 *           example: true
 *         description: Enable pagination.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *             - id
 *         description: Field to sort customers by.
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum:
 *             - ASC
 *             - DESC
 *         description: Sort order.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of customers to return.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination.
 *     responses:
 *       200:
 *         description: Customer list retrieved successfully
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
 *                     $ref: '#/components/schemas/Customer'
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
 *                   type: string
 *                   example: "Error message"
 */
router.get('/', customerController.list);

/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     tags:
 *       - Customer
 *     summary: Get a Customer by ID
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
 *         description: Customer retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
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
 *                   type: string
 *                   example: "Error message"
 */
router.get('/:id', customerController.getById);

/**
 * @swagger
 * /customer/{id}:
 *   delete:
 *     tags:
 *       - Customer
 *     summary: Remove a Customer by ID
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
 *         description: Customer removed successfully
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
 *                   type: string
 *                   example: "Error message"
 */
router.delete('/:id', customerController.remove);

/**
 * @swagger
 * /customer:
 *   post:
 *     tags:
 *       - Customer
 *     summary: Create a new Customer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       409:
 *         description: Conflict error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Conflict error message"
 */
router.post(
  '/',
  upload.fields([
    { name: 'passportAttachment', maxCount: 1 },
    { name: 'otherAttachment', maxCount: 1 },
    { name: 'tradeLicenseAttachment', maxCount: 1 },
    { name: 'tinAttachment', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
  ]),
  stringParser(),
  schemaValidator(customerSchema.create),
  customerController.create,
);

/**
 * @swagger
 * /customer/{id}:
 *   patch:
 *     summary: Update a Customer by ID
 *     tags:
 *       - Customer
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
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
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
 *                   type: string
 *                   example: "Error message"
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Customer not found"
 */
router.patch(
  '/:id',
  stringParser(),
  schemaValidator(customerSchema.update),
  customerController.update,
);

export default router;
