const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  variant: {
    size: String,
    color: String,
  },
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [orderProductSchema],
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  shippingInfo: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
    phone: String,
  },
  couponRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
