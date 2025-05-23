const Order = require('../models/Order');
const { validationResult } = require('express-validator');

// Create Order
exports.createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const order = new Order({ ...req.body, userId: req.user.id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// Get all orders (admin) or user orders
exports.getOrders = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? { isDeleted: false } : { userId: req.user.id, isDeleted: false };
    const orders = await Order.find(query).sort('-createdAt');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Get single order
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, isDeleted: false });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (req.user.role !== 'admin' && order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// Soft delete order (admin only)
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    next(err);
  }
};
