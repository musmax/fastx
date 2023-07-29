const mongoose = require('mongoose');

const pickupAddressSchema = new mongoose.Schema({
  houseNumber: {
    type: String,
    required: true,
    maxlength: 255,
  },
  flatNumber: {
    type: String,
    required: true,
    maxlength: 255,
  },
  street: {
    type: String,
    required: true,
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
  state: {
    type: String,
    required: true,
    maxlength: 255,
  },
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const PickupAddress = mongoose.model('PickupAddress', pickupAddressSchema);

module.exports = {
  PickupAddress,
};
