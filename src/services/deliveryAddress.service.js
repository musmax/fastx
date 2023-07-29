const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { DeliveryAddress } = require('../models/deliveryAddress.model');

/**
 * Get all DeliveryAddresss
 * @param {Object} filter
 * @returns {Promise<DeliveryAddress[]>}
 */
const getAllDeliveryAddresss = async (filter) => {
  return DeliveryAddress.find(filter);
};

/**
 * Get DeliveryAddress by id
 * @param {ObjectId} id
 * @returns {Promise<DeliveryAddress>}
 */
const getDeliveryAddressById = async (id) => {
  return DeliveryAddress.findById(id);
};

/**
 * Create DeliveryAddress
 * @param {Object} DeliveryAddressBody
 * @returns {Promise<DeliveryAddress>}
 */
const createDeliveryAddress = async (DeliveryAddressBody, userId) => {
  return DeliveryAddress.create({ ...DeliveryAddressBody, userId });
};

/**
 * Update DeliveryAddress by id
 * @param {ObjectId} DeliveryAddressId
 * @param {Object} updateBody
 * @returns {Promise<DeliveryAddress>}
 */
const updateDeliveryAddressById = async (DeliveryAddressId, updateBody) => {
  const deliveryAddress = await getDeliveryAddressById(DeliveryAddressId);
  if (!deliveryAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Delivery Address not found');
  }
  Object.assign(deliveryAddress, updateBody);
  await deliveryAddress.save();
  return deliveryAddress;
};

/**
 * Delete DeliveryAddress by id
 * @param {ObjectId} DeliveryAddressId
 * @returns {Promise<DeliveryAddress>}
 */
const deleteDeliveryAddressById = async (DeliveryAddressId) => {
  const address = await DeliveryAddress.findByIdAndDelete(DeliveryAddressId);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  return address;
};

module.exports = {
  getAllDeliveryAddresss,
  getDeliveryAddressById,
  createDeliveryAddress,
  updateDeliveryAddressById,
  deleteDeliveryAddressById,
};
