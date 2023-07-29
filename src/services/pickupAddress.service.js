const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { PickupAddress } = require('../models/pickupAddress');

/**
 * Get all PickupAddresss
 * @param {Object} filter
 * @returns {Promise<PickupAddress[]>}
 */
const getAllPickupAddresss = async (filter) => {
  return PickupAddress.find(filter);
};

/**
 * Get PickupAddress by id
 * @param {ObjectId} id
 * @returns {Promise<PickupAddress>}
 */
const getPickupAddressById = async (id) => {
  return PickupAddress.findById(id);
};

/**
 * Create PickupAddress
 * @param {Object} PickupAddressBody
 * @returns {Promise<PickupAddress>}
 */
const createPickupAddress = async (PickupAddressBody, userId) => {
  return PickupAddress.create({ ...PickupAddressBody, userId });
};

/**
 * Update PickupAddress by id
 * @param {ObjectId} PickupAddressId
 * @param {Object} updateBody
 * @returns {Promise<PickupAddress>}
 */
const updatePickupAddressById = async (PickupAddressId, updateBody) => {
  const pickupAddress = await getPickupAddressById(PickupAddressId);
  if (!pickupAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pickup Address not found');
  }
  Object.assign(pickupAddress, updateBody);
  await pickupAddress.save();
  return pickupAddress;
};

/**
 * Delete PickupAddress by id
 * @param {ObjectId} PickupAddressId
 * @returns {Promise<PickupAddress>}
 */
const deletePickupAddressById = async (PickupAddressId) => {
  const address = await PickupAddress.findByIdAndDelete(PickupAddressId);
  if (!address) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  return address;
};

module.exports = {
  getAllPickupAddresss,
  getPickupAddressById,
  createPickupAddress,
  updatePickupAddressById,
  deletePickupAddressById,
};
