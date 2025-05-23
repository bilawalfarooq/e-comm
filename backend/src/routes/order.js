const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Create order (user)
router.post(
  '/',
  authenticate,
  [
    body('products').isArray({ min: 1 }).withMessage('Products required'),
    body('shippingInfo').notEmpty().withMessage('Shipping info required'),
  ],
  orderController.createOrder
);

// Get all orders (admin) or user orders
router.get('/', authenticate, orderController.getOrders);

// Get single order
router.get('/:id', authenticate, orderController.getOrder);

// Update order status (admin only)
router.put(
  '/:id/status',
  authenticate,
  authorizeRoles('admin'),
  [body('status').isIn(['pending','paid','shipped','delivered','cancelled'])],
  orderController.updateOrderStatus
);

// Soft delete order (admin only)
router.delete(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  orderController.deleteOrder
);

module.exports = router;
