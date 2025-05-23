const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/', authenticate, authorizeRoles('admin'), userController.getUsers);

// Get single user (admin or self)
router.get('/:id', authenticate, userController.getUser);

// Update user (admin or self)
router.put(
  '/:id',
  authenticate,
  [
    body('name').optional().notEmpty().withMessage('Name required'),
    body('email').optional().isEmail().withMessage('Valid email required'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password min 6 chars'),
  ],
  userController.updateUser
);

// Soft delete user (admin or self)
router.delete('/:id', authenticate, userController.deleteUser);

// Admin create user with role
router.post(
  '/',
  authenticate,
  authorizeRoles('admin'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Role must be user or admin'),
  ],
  userController.createUser
);

module.exports = router;
