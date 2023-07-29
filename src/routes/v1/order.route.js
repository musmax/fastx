const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { orderValidation } = require('../../validations');
const { orderController } = require('../../controllers');

const router = express.Router();

router.route('/').post(auth(), validate(orderValidation.createOrder), orderController.createOrder);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management and retrieval
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create an order
 *     description: Only users and admins can create order.
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - partnerId
 *               - deliveryId
 *               - pickupId
 *             properties:
 *               productId:
 *                 type: string
 *               partnerId:
 *                 type: number
 *               deliveryId:
 *                 type: string
 *               pickupId: string
 *             example:
 *               productId: 64c3a89d1f504de4ee46bcd2
 *               partnerId: 04c3a89d1f504de4ee46bcd2
 *               deliveryId: 84c3a89d1f504de4ee46bcd2
 *               pickupId: 64d3a89d1f504de4ee46bcd2
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             $ref: '#/components/responses/NotFound'
 *       "401":
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         description: Forbidden
 *         content:
 *           application/json:
 *             $ref: '#/components/responses/Forbidden'
 */
