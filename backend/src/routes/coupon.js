const express = require('express');
const { body } = require('express-validator');
const couponController = require('../controllers/couponController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Create coupon (admin only)
router.post(
  '/',
  authenticate,
  authorizeRoles('admin'),
  [
    body('code').notEmpty().withMessage('Code is required'),
    body('discountType').isIn(['percentage', 'fixed']).withMessage('Invalid discount type'),
    body('discountValue').isNumeric().withMessage('Discount value must be a number'),
    body('expiryDate').isISO8601().withMessage('Expiry date required'),
  ],
  couponController.createCoupon
);

// Get all coupons
router.get('/', authenticate, authorizeRoles('admin'), couponController.getCoupons);

// Get single coupon
router.get('/:id', authenticate, authorizeRoles('admin'), couponController.getCoupon);

// Update coupon (admin only)
router.put(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  couponController.updateCoupon
);

// Soft delete coupon (admin only)
router.delete(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  couponController.deleteCoupon
);

module.exports = router;
