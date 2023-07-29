const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Order } = require('../models/order.model');
const { getUserById, getProductById, getDeliveryAddressById, getPickupAddressById } = require('.');

/**
 * Create an order
 * @params {Object} orderBody
 * @params {string} orderBody.productId
 * @params {string} orderBody.deliveryId
 * @params {string} orderBody.pickupId
 * @params {string} orderBody.partnerId
 */

const createOrder = async (orderBody, userId) => {
  const { productId, partnerId, deliveryId, pickupId } = orderBody;
  // check if product exist
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found ');
  }
  // check if partner exist
  const partner = await getUserById(partnerId);
  if (!partner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Partner not found');
  }
  // check if delivery address exist
  const deliveryaddress = await getDeliveryAddressById(deliveryId);
  if (!deliveryaddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }
  // check if pickup address exist
  const pickupAddress = await getPickupAddressById(pickupId);
  if (!pickupAddress) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Address not found');
  }

  const order = await Order.create({ ...orderBody, userId });
  return order;
};

module.exports = {
  createOrder,
};
