const express = require('express');
const auth = require('../../middlewares/auth');
const { uploadController } = require('../../controllers');
const upload = require('../../config/multer');

const router = express.Router();

router.route('/').post(upload.single('link'), uploadController.uploadFile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: File uploads
 */

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: File uploads
 */

/**
 * @swagger
 * /uploads:
 *   post:
 *     summary: Upload a file
 *     description: Only admins can upload files.
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - link
 *             properties:
 *               link:
 *                 type: string
 *                 format: binary
 *             example:
 *               url: http://example.com
 *               public_id: http://example.com
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Upload'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
