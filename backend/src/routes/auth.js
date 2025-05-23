const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { authLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

// Signup
router.post(
  '/signup',
  authLimiter,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  ],
  authController.signup
);

// Login
router.post(
  '/login',
  authLimiter,
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login
);

module.exports = router;
