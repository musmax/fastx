const Joi = require('joi');
const { password } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    isVerified: Joi.boolean().default(false).required(),
    role: Joi.string().valid('admin', 'user', 'partner').default('user').required(),
  }),
};

const createPartner = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    identification: Joi.string().required(),
    profileImage: Joi.string(),
    BVN: Joi.number().required(),
    phoneNumber: Joi.string().required(),
    role: Joi.string().valid('admin', 'user', 'partner').default('partner'),
    vehicleType: Joi.string().valid('car', 'bicycle', 'bike', 'lorry', 'bus', 'boat').required(),
    locationGeometry: Joi.array().items(Joi.string()).required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    email: Joi.string(),
    userType: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    isVerified: Joi.boolean(),
  }),
};

const verifyPartner = {
  body: Joi.object().keys({
    adminId: Joi.number().required(),
    partnerId: Joi.number(),
    isVerified: Joi.boolean(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      identification: Joi.string().required(),
      profileImage: Joi.string(),
      BVN: Joi.number().required(),
      phoneNumber: Joi.string().required(),
      vehicleType: Joi.string().valid('car', 'bicycle', 'bike', 'lorry', 'bus', 'boat').required(),
      locationGeometry: Joi.array().items(Joi.string()).required(),
    })
    .min(1),
};
const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createPartner,
  verifyPartner,
};
