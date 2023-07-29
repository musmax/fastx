const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  ],
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
  ],
  deliveryId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'DeliveryAddress',
    },
  ],
  pickupId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'PickupAddress',
    },
  ],
  partnerId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  ],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Order,
};
