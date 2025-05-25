// Demo data for quick API testing
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');
const Coupon = require('./src/models/Coupon');
const Order = require('./src/models/Order');
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
  await Order.deleteMany({});

  // Create users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);
  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: adminPassword, role: 'admin' });
  const user = await User.create({ name: 'User', email: 'user@example.com', password: userPassword, role: 'user' });

  // Add more demo users
  const user2 = await User.create({ name: 'Alice Smith', email: 'alice@example.com', password: userPassword, role: 'user' });
  const user3 = await User.create({ name: 'Bob Lee', email: 'bob@example.com', password: userPassword, role: 'user' });
  const user4 = await User.create({ name: 'Carol Jones', email: 'carol@example.com', password: userPassword, role: 'user' });

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

  // Create demo orders
  await Order.create({
    userId: user._id,
    products: [
      { product: prod1._id, quantity: 2 },
      { product: prod2._id, quantity: 1 }
    ],
    status: 'paid',
    shippingInfo: {
      address: '123 Main St',
      city: 'City',
      postalCode: '12345',
      country: 'Country',
      phone: '1234567890'
    },
    total: 539.97,
    createdAt: new Date()
  });
  await Order.create({
    userId: user._id,
    products: [
      { product: prod2._id, quantity: 3 }
    ],
    status: 'pending',
    shippingInfo: {
      address: '456 Side St',
      city: 'Town',
      postalCode: '67890',
      country: 'Country',
      phone: '0987654321'
    },
    total: 59.97,
    createdAt: new Date()
  });

  // Add more demo orders for top customers
  await Order.create({
    userId: user2._id,
    products: [ { product: prod1._id, quantity: 3 } ],
    status: 'delivered',
    shippingInfo: { address: '789 North St', city: 'Metro', postalCode: '22222', country: 'Country', phone: '2222222222' },
    total: 1499.97,
    createdAt: new Date('2025-04-10')
  });
  await Order.create({
    userId: user3._id,
    products: [ { product: prod2._id, quantity: 5 } ],
    status: 'delivered',
    shippingInfo: { address: '101 South St', city: 'Village', postalCode: '33333', country: 'Country', phone: '3333333333' },
    total: 99.95,
    createdAt: new Date('2025-03-15')
  });
  await Order.create({
    userId: user4._id,
    products: [ { product: prod1._id, quantity: 1 }, { product: prod2._id, quantity: 2 } ],
    status: 'paid',
    shippingInfo: { address: '202 East St', city: 'Town', postalCode: '44444', country: 'Country', phone: '4444444444' },
    total: 539.97,
    createdAt: new Date('2025-02-20')
  });

  console.log('Demo data seeded!');
  process.exit();
}

seed();
