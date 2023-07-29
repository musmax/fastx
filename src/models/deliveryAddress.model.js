const mongoose = require('mongoose');

const deliveryAddressSchema = new mongoose.Schema({
  houseNumber: {
    type: String,
    maxlength: 255,
  },
  flatNumber: {
    type: String,
    maxlength: 255,
  },
  street: {
    type: String,
    maxlength: 255,
  },
  town: {
    type: String,
    required: true,
    maxlength: 255,
  },
  city: {
    type: String,
    required: true,
    maxlength: 255,
  },
  lga: {
    type: String,
    required: true,
    maxlength: 255,
  },
  state: {
    type: String,
    required: true,
    maxlength: 255,
  },
  receiverName: {
    type: String,
    maxlength: 255,
  },
  receiverPhoneNumber: {
    type: [String],
  },
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const DeliveryAddress = mongoose.model('DeliveryAddress', deliveryAddressSchema);

module.exports = {
  DeliveryAddress,
};
