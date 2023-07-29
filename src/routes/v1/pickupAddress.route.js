const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { pickupAddressValidation } = require('../../validations');
const { pickupAddressController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(pickupAddressValidation.createPickupAddress), pickupAddressController.createPickupAddress)
  .get(auth(), validate(pickupAddressValidation.getAllPickupAddress), pickupAddressController.getPickupAddresss);

router
  .route('/:id')
  .get(auth(), validate(pickupAddressValidation.getPickupAddressById), pickupAddressController.getPickupAddressById)
  .patch(auth(), validate(pickupAddressValidation.updatePickupAddressById), pickupAddressController.updatePickupAddressById)
  .delete(
    auth(),
    validate(pickupAddressValidation.deletePickupAddressById),
    pickupAddressController.deletePickupAddressById
  );

module.exports = router;

/**
 * @swagger
 * /pickup-address:
 *   post:
 *     summary: Create a pick-up address
 *     description: Only users can create pick-up addresses.
 *     tags: [PickupAddresses]
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
 *               houseNumber: 52
 *               street: Shitta street
 *               town: Dopemu
 *               city: Agege
 *               lga: Agege
 *               state: Lagos
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/PickUpAddress'
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
 *     summary: Get all pick-up addresses
 *     description: Only admins can retrieve all pick-up addresses.
 *     tags: [PickupAddresses]
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
 *                     $ref: '#/components/schemas/PickUpAddress'
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
 * /pickup-address/{id}:
 *   get:
 *     summary: Get a pickup addresses
 *     description: Only admins and users can fetch pickup addressess.
 *     tags: [PickupAddresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description:  pickup address id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/PickUpAddress'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a pickup address
 *     description: Only admins and user can update pickup address.
 *     tags: [PickupAddresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: pickup address id
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
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/PickUpAddress'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Pickup address
 *     description: Only admins and users and users can delete pickupaddress.
 *     tags: [PickupAddresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: pickup address id
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
