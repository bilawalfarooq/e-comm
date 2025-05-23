const express = require('express');
const { authenticate } = require('../middlewares/auth');
const recentlyViewedController = require('../controllers/recentlyViewedController');

const router = express.Router();

router.get('/', authenticate, recentlyViewedController.getRecentlyViewed);
router.post('/add', authenticate, recentlyViewedController.addRecentlyViewed);

module.exports = router;
