const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Product } = require('../models/products.model');

/**
 * Get all Products
 * @param {Object} filter
 * @returns {Promise<Product[]>}
 */
const getAllProducts = async (filter) => {
  return Product.find(filter);
};

/**
 * Get Product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return Product.findById(id);
};

/**
 * Create Product
 * @param {Object} ProductBody
 * @returns {Promise<Product>}
 */
const createProduct = async (ProductBody, userId) => {
  const product = await Product.create({ ...ProductBody, userId });
  return product;
};

/**
 * Update Product by id
 * @param {ObjectId} ProductId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (ProductId, updateBody) => {
  const product = await getProductById(ProductId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'product not found');
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
};
