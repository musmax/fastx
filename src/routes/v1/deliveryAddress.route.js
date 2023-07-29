const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { deliveryAddressValidation } = require('../../validations');
const { deliveryAddressController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(deliveryAddressValidation.createDeliveryAddress), deliveryAddressController.createDeliveryupAddress)
  .get(auth(), validate(deliveryAddressValidation.getAllDeliveryAddress), deliveryAddressController.getDeliveryupAddresss);

router
  .route('/:id')
  .get(
    auth(),
    validate(deliveryAddressValidation.getDeliveryAddressById),
    deliveryAddressController.getDeliveryupAddressById
  )
  .patch(
    auth(),
    validate(deliveryAddressValidation.updateDeliveryAddressById),
    deliveryAddressController.updateDeliveryupAddressById
  )
  .delete(
    auth(),
    validate(deliveryAddressValidation.deleteDeliveryAddressById),
    deliveryAddressController.deleteDeliveryupAddressById
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Delivery Addresses
 *   description: Delivery address management and retrieval
 */

/**
 * @swagger
 * /delivery-address:
 *   post:
 *     summary: Create a delivery address
 *     description: Only users and admins can create delivery addresses.
 *     tags: [Delivery Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - city
 *               - town
 *               - state
 *               - lga
 *             properties:
 *               flatNumber:
 *                 type: string
 *               houseNumber:
 *                 type: number
 *               street:
 *                 type: string
 *               town:
 *                 type: string
 *               city:
 *                 type: string
 *               lga:
 *                 type: string
 *               state:
 *                 type: string
 *               receiverPhoneNumber:
 *                 type: array
 *               receiverName:
 *                 type: string
 *             example:
 *               flatNumber: 12B
 *               houseNumber: 52
 *               street: Shitta street
 *               town: Dopemu
 *               city: Agege
 *               lga: Agege
 *               state: Lagos
 *               receiverPhoneNumber: ['1223334444555', '99088776666']
 *               receiverName: Mr Kenny
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryAddress'
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
 *
 *   get:
 *     summary: Get all delivery addresses
 *     description: Only admins can retrieve all delivery addresses.
 *     tags: [Delivery Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DeliveryAddress'
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

/**
 * @swagger
 * /delivery-address/{id}:
 *   get:
 *     summary: Get a pickup addresses
 *     description: Only admins and users can fetch delivery addressess.
 *     tags: [Delivery Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description:  delivery address id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DeliveryAddress'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a delivery address
 *     description: Only admins and user can update delivery address.
 *     tags: [Delivery Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: delivery address id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flatNumber:
 *                 type: string
 *               houseNumber:
 *                 type: string
 *               street:
 *                 type: string
 *               town:
 *                 type: string
 *               city:
 *                 type: string
 *               lga:
 *                 type: string
 *               state:
 *                 type: string
 *             example:
 *               flatNumber: 12B
 *               houseNumber: 43
 *               street: Adekunle Fajuyi
 *               town: Dopemu
 *               city: Lagos Island
 *               lga: Lagos Island
 *               state: Lagos
 *               receiverPhoneNumber: ['99888887777', '1234567890']
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/DeliveryAddress'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Pickup address
 *     description: Only admins and users and users can delete Delivery address.
 *     tags: [Delivery Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: delivery address id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
