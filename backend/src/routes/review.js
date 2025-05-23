const express = require('express');
const { body } = require('express-validator');
const reviewController = require('../controllers/reviewController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Create review (user)
router.post(
  '/',
  authenticate,
  [
    body('productId').notEmpty().withMessage('Product ID required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating 1-5 required'),
  ],
  reviewController.createReview
);

// Get all reviews for a product
router.get('/product/:productId', reviewController.getProductReviews);

// Update review (user only)
router.put('/:id', authenticate, reviewController.updateReview);

// Soft delete review (user or admin)
router.delete('/:id', authenticate, reviewController.deleteReview);

module.exports = router;
