const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Create product (admin only)
router.post(
  '/',
  authenticate,
  authorizeRoles('admin'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
  ],
  productController.createProduct
);

// Get all products
router.get('/', productController.getProducts);

// Get single product
router.get('/:id', productController.getProduct);

// Update product (admin only)
router.put(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  productController.updateProduct
);

// Soft delete product (admin only)
router.delete(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  productController.deleteProduct
);

module.exports = router;
