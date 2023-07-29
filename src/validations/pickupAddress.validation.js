const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createPickupAddress = {
  body: Joi.object().keys({
    houseNumber: Joi.number().required(),
    flatNumber: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    town: Joi.string().required(),
    lga: Joi.string().required(),
    state: Joi.string().required(),
  }),
};

const getAllPickupAddress = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPickupAddressById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updatePickupAddressById = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      houseNumber: Joi.number(),
      flatNumber: Joi.string(),
      street: Joi.string(),
      city: Joi.string(),
      town: Joi.string(),
      lga: Joi.string(),
      state: Joi.string(),
    })
    .min(1),
};

const deletePickupAddressById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createPickupAddress,
  getAllPickupAddress,
  getPickupAddressById,
  updatePickupAddressById,
  deletePickupAddressById,
};
