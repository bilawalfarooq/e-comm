const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');

// Get all categories
router.get('/', categoryController.getCategories);
// Get single category
router.get('/:id', categoryController.getCategory);
// Create category (admin)
router.post('/', authenticate, authorizeRoles('admin'), categoryController.createCategory);
// Update category (admin)
router.put('/:id', authenticate, authorizeRoles('admin'), categoryController.updateCategory);
// Delete category (admin)
router.delete('/:id', authenticate, authorizeRoles('admin'), categoryController.deleteCategory);

module.exports = router;
