const Review = require('../models/Review');
const { validationResult } = require('express-validator');

// Create review
exports.createReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const review = new Review({ ...req.body, userId: req.user.id });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

// Get all reviews for a product
exports.getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId, isDeleted: false }).sort('-createdAt');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// Update review (user only)
exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id, isDeleted: false },
      req.body,
      { new: true }
    );
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (err) {
    next(err);
  }
};

// Soft delete review (user or admin)
exports.deleteReview = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id, isDeleted: false }
      : { _id: req.params.id, userId: req.user.id, isDeleted: false };
    const review = await Review.findOneAndUpdate(query, { isDeleted: true }, { new: true });
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};
