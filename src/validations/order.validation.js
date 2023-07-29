const Joi = require('joi');

const createOrder = {
  body: Joi.object().keys({
    productId: Joi.string().required(),
    deliveryId: Joi.string().required(),
    pickupId: Joi.string().required(),
    partnerId: Joi.string().required(),
  }),
};

module.exports = {
  createOrder,
};
