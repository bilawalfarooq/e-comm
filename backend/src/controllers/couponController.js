const Coupon = require('../models/Coupon');
const { validationResult } = require('express-validator');

// Create coupon (admin only)
exports.createCoupon = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    next(err);
  }
};

// Get all coupons
exports.getCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find({ isDeleted: false }).sort('-createdAt');
    res.json(coupons);
  } catch (err) {
    next(err);
  }
};

// Get single coupon
exports.getCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findOne({ _id: req.params.id, isDeleted: false });
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json(coupon);
  } catch (err) {
    next(err);
  }
};

// Update coupon (admin only)
exports.updateCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true }
    );
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json(coupon);
  } catch (err) {
    next(err);
  }
};

// Soft delete coupon (admin only)
exports.deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    res.json({ message: 'Coupon deleted' });
  } catch (err) {
    next(err);
  }
};
