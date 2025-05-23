const express = require('express');
const { authenticate } = require('../middlewares/auth');
const wishlistController = require('../controllers/wishlistController');

const router = express.Router();

router.get('/', authenticate, wishlistController.getWishlist);
router.post('/add', authenticate, wishlistController.addToWishlist);
router.post('/remove', authenticate, wishlistController.removeFromWishlist);

module.exports = router;
