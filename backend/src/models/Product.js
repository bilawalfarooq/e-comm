const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema({
  size: String,
  color: String,
  stock: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  images: [{ type: String }], // URLs or file paths
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  variants: [productVariantSchema],
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
