const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.user._id);
  res.status(httpStatus.CREATED).send(order);
});

module.exports = {
  createOrder,
};
