import express from 'express';
import mainWebsitePageController from '../../controllers/core/main-website-page.controller';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: MainWebsitePage
 *     description: Endpoints related to MainWebsitePage
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MainWebsitePage:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /core/main-website-page:
 *   get:
 *     tags:
 *       - MainWebsitePage
 *     summary: Get list of MainWebsitePage
 *     responses:
 *       200:
 *         description: MainWebsitePage list retrieved successfully
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
 *                     $ref: '#/components/schemas/MainWebsitePage'
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
router.get('/', mainWebsitePageController.landingPageData);

/**
 * @swagger
 * /core/main-website-page/{sectionName}:
 *   get:
 *     tags:
 *       - MainWebsitePage
 *     summary: Get a MainWebsitePage by sectionName
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
 *         description: MainWebsitePage retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/MainWebsitePage'
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
router.get('/:sectionName', mainWebsitePageController.getByName);


export default router;
