// Demo data for quick API testing
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
const Coupon = require('./src/models/Coupon');
const bcrypt = require('bcrypt');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecomm';

async function seed() {
  await mongoose.connect(MONGO_URI);

  // Clear collections
  await User.deleteMany({});
  await Product.deleteMany({});
  await Category.deleteMany({});
  await Coupon.deleteMany({});

  // Create users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);
  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: adminPassword, role: 'admin' });
  const user = await User.create({ name: 'User', email: 'user@example.com', password: userPassword, role: 'user' });

  // Create categories
  const cat1 = await Category.create({ name: 'Electronics', description: 'Gadgets and devices' });
  const cat2 = await Category.create({ name: 'Clothing', description: 'Apparel and accessories' });

  // Create products
  const prod1 = await Product.create({
    name: 'Smartphone',
    price: 499.99,
    images: ['img1.jpg'],
    description: 'A cool smartphone',
    category: cat1._id,
    variants: [{ size: 'M', color: 'Black', stock: 10 }],
  });
  const prod2 = await Product.create({
    name: 'T-Shirt',
    price: 19.99,
    images: ['img2.jpg'],
    description: 'Comfortable cotton t-shirt',
    category: cat2._id,
    variants: [{ size: 'L', color: 'White', stock: 20 }],
  });

  // Create coupon
  await Coupon.create({
    code: 'DISCOUNT10',
    discountType: 'percentage',
    discountValue: 10,
    expiryDate: new Date('2025-12-31'),
    usageLimit: 100,
  });

  console.log('Demo data seeded!');
  process.exit();
}

seed();
