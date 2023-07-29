const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    item: Joi.string().required(),
    description: Joi.string(),
    color: Joi.string().required(),
    numberOfItem: Joi.number().required(),
    weightOfItem: Joi.string().required(),
    insurance: Joi.boolean().default(false),
    productForm: Joi.string().valid('new', 'old', 'used').required(),
    vehicleType: Joi.string().valid('car', 'bicycle', 'bike', 'lorry', 'bus', 'boat').required(),
    mediaIds: Joi.array().items(Joi.string()),
    productUsefulness: Joi.string(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    item: Joi.string(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
};

const updateProductById = {
  params: Joi.object().keys({
    productId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    item: Joi.string(),
    description: Joi.string(),
    color: Joi.string(),
    numberOfItem: Joi.number(),
    weightOfItem: Joi.string(),
    insurance: Joi.boolean().default(false),
    productForm: Joi.string().valid('new', 'old', 'used'),
    vehicleType: Joi.string().valid('car', 'bicycle', 'bike', 'lorry', 'bus', 'boat'),
    mediaIds: Joi.string(),
  }),
};

module.exports = {
  createProduct,
  getProduct,
  updateProductById,
  getProducts,
};
