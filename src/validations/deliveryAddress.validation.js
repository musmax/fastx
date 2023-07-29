const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createDeliveryAddress = {
  body: Joi.object().keys({
    houseNumber: Joi.number(),
    flatNumber: Joi.string(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    town: Joi.string().required(),
    lga: Joi.string().required(),
    state: Joi.string().required(),
    receiverName: Joi.string(),
    receiverPhoneNumber: Joi.array().items(Joi.string()),
  }),
};

const getAllDeliveryAddress = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getDeliveryAddressById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updateDeliveryAddressById = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      houseNumber: Joi.number(),
      flatNumber: Joi.string(),
      street: Joi.string().required(),
      city: Joi.string().required(),
      town: Joi.string().required(),
      lga: Joi.string().required(),
      state: Joi.string().required(),
      receiverName: Joi.string(),
      receiverPhoneNumber: Joi.array().items(Joi.string()),
    })
    .min(1),
};

const deleteDeliveryAddressById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createDeliveryAddress,
  getAllDeliveryAddress,
  getDeliveryAddressById,
  updateDeliveryAddressById,
  deleteDeliveryAddressById,
};
