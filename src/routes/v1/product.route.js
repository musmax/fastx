const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { productValidation } = require('../../validations');
const { productController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(productValidation.createProduct), productController.createProduct)
  .get(auth(), validate(productValidation.getProducts), productController.getProducts);

router
  .route('/:productId')
  .get(auth(), validate(productValidation.getProduct), productController.getProductById)
  .patch(auth(), validate(productValidation.updateProductById), productController.updateProductById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and retrieval
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a product
 *     description: Only admins and users can create a product.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - item
 *               - description
 *               - color
 *               - numberOfItems
 *               - weightOfItems
 *               - productForm
 *               - mediaIds
 *               - productUsefulness
 *               - vehicleType
 *             properties:
 *               item:
 *                 type: string
 *               description:
 *                 type: string
 *               numberOfItem:
 *                 type: number
 *               color:
 *                 type: string
 *               weightOfItem:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *                 enum: ['car', 'boat', 'lorry', 'bus', 'bike', 'bicycle']
 *               productUsefulness:
 *                 type: string
 *               mediaIds:
 *                 type: array
 *                 items:
 *                   type: string
 *               productForm:
 *                 type: string
 *                 enum: ['new', 'old', 'used']
 *               insurance:
 *                 type: boolean
 *             example:
 *               item: Samsung A03s
 *               description: This is a phone gadget
 *               numberOfItem: 2
 *               color: red
 *               weightOfItem: 12.5kg
 *               vehicleType: lorry
 *               productUsefulness: This product is a communication tool
 *               mediaIds: ['5ebac534954b54139806c112', '5ebac534954b54139806c112']
 *               productForm: new
 *               insurance: false
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       "400":
 *         $ref: '#/components/responses/NotFound'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all products
 *     description: Only admins can retrieve all products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *          description: Product name
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
 *                     $ref: '#/components/schemas/Product'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product
 *     description: Only admins can fetch products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
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
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Product
 *     description: Only admins can update Products.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *           example:
 *             item: Updated Product Name
 *             description: Updated product description
 *             numberOfItem: 10
 *             color: blue
 *             weightOfItem: 15.0kg
 *             vehicleType: lorry
 *             productUsefulness: This product is now more useful
 *             productForm: new
 *             insurance: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
