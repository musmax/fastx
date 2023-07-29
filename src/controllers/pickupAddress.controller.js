const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { pickupAddressService } = require('../services');
const pick = require('../utils/pick');

const createPickupAddress = catchAsync(async (req, res) => {
  const pickupAddress = await pickupAddressService.createPickupAddress(req.body, req.user._id);
  res.status(httpStatus.CREATED).send(pickupAddress);
});

const getPickupAddresss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const pickupAddresss = await pickupAddressService.getAllPickupAddresss(filter);
  res.status(httpStatus.OK).send(pickupAddresss);
});

const getPickupAddressById = catchAsync(async (req, res) => {
  const pickupAddress = await pickupAddressService.getPickupAddressById(req.params.id);
  if (!pickupAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'pickup Address not found');
  }
  res.status(httpStatus.OK).send(pickupAddress);
});

const updatePickupAddressById = catchAsync(async (req, res) => {
  const pickupAddress = await pickupAddressService.updatePickupAddressById(req.params.id, req.body);
  res.status(httpStatus.OK).send(pickupAddress);
});

const deletePickupAddressById = catchAsync(async (req, res) => {
  await pickupAddressService.deletePickupAddressById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPickupAddress,
  getPickupAddresss,
  getPickupAddressById,
  updatePickupAddressById,
  deletePickupAddressById,
};
