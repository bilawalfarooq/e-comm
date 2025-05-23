const Product = require('../models/Product');
const { validationResult } = require('express-validator');

// Create Product (Admin only)
exports.createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Get all products with filter, sort, paginate
exports.getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', ...filters } = req.query;
    const query = { isDeleted: false, ...filters };
    const products = await Product.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Product.countDocuments(query);
    res.json({ products, total });
  } catch (err) {
    next(err);
  }
};

// Get single product
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, isDeleted: false });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Update product (Admin only)
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Soft delete product (Admin only)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
