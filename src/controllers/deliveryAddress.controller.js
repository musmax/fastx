const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { deliveryAddessService } = require('../services');
const Delivery = require('../utils/pick');

const createDeliveryupAddress = catchAsync(async (req, res) => {
  const deliveryupAddress = await deliveryAddessService.createDeliveryAddress(req.body, req.user._id);
  res.status(httpStatus.CREATED).send(deliveryupAddress);
});

const getDeliveryupAddresss = catchAsync(async (req, res) => {
  const filter = Delivery(req.query, ['name']);
  const deliveryupAddresss = await deliveryAddessService.getAllDeliveryAddresss(filter);
  res.status(httpStatus.OK).send(deliveryupAddresss);
});

const getDeliveryupAddressById = catchAsync(async (req, res) => {
  const deliveryupAddress = await deliveryAddessService.getDeliveryAddressById(req.params.id);
  if (!deliveryupAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Delivery Address not found');
  }
  res.status(httpStatus.OK).send(deliveryupAddress);
});

const updateDeliveryupAddressById = catchAsync(async (req, res) => {
  const deliveryupAddress = await deliveryAddessService.updateDeliveryAddressById(req.params.DeliveryupAddressId, req.body);
  res.status(httpStatus.OK).send(deliveryupAddress);
});

const deleteDeliveryupAddressById = catchAsync(async (req, res) => {
  await deliveryAddessService.deleteDeliveryAddressById(req.params.DeliveryupAddressId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDeliveryupAddress,
  getDeliveryupAddresss,
  getDeliveryupAddressById,
  updateDeliveryupAddressById,
  deleteDeliveryupAddressById,
};
