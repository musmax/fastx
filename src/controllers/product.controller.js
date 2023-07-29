const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body, req.user._id);
  res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const products = await productService.getAllProducts();
  res.status(httpStatus.OK).send(products);
});

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  res.status(httpStatus.OK).send(product);
});

const updateProductById = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.status(httpStatus.OK).send(product);
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
};
