// Core Express app setup with security and logging middlewares
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Placeholder for routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const couponRoutes = require('./routes/coupon');
const reviewRoutes = require('./routes/review');
const wishlistRoutes = require('./routes/wishlist');
const recentlyViewedRoutes = require('./routes/recentlyViewed');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/recently-viewed', recentlyViewedRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', time: new Date() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
