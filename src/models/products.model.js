const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  item: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  numberOfItem: {
    type: String,
    required: true,
    trim: true,
  },
  weightOfItem: {
    type: String,
    trim: true,
  },
  insurance: {
    type: Boolean,
    default: false,
  },
  productForm: {
    type: String,
    required: true,
    trim: true,
    enum: ['new', 'old', 'used'],
  },
  productUsefulness: {
    type: String,
    required: false,
    trim: true,
  },
  vehicleType: {
    type: String,
    required: true,
    trim: true,
    enum: ['car', 'bicycle', 'bike', 'lorry', 'bus', 'boat'],
  },
  mediaIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
    },
  ],
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});
/**
 * @typedef product
 */
const Product = mongoose.model('Product', productSchema);
module.exports = {
  Product,
};
