const Order = require('../models/Order');
const { validationResult } = require('express-validator');
const { generateInvoice } = require('../utils/invoice');
const User = require('../models/User');
const path = require('path');

// Create Order
exports.createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const order = new Order({ ...req.body, userId: req.user.id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// Get all orders (admin) or user orders
exports.getOrders = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? { isDeleted: false } : { userId: req.user.id, isDeleted: false };
    const orders = await Order.find(query).sort('-createdAt');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Get single order
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, isDeleted: false });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (req.user.role !== 'admin' && order.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// Soft delete order (admin only)
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    next(err);
  }
};

// Generate and download invoice PDF for an order
exports.downloadInvoice = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('products.product');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  const user = await User.findById(order.userId);
  const filePath = path.join(__dirname, '../../invoices', `invoice-${order._id}.pdf`);
  await generateInvoice(order, user, filePath);
  res.download(filePath, `invoice-${order._id}.pdf`, err => {
    if (err) res.status(500).json({ message: 'Could not download invoice' });
    // Optionally, delete the file after download
    // fs.unlinkSync(filePath);
  });
};

// --- Analytics endpoint for dashboard ---
exports.getOrderAnalytics = async (req, res, next) => {
  try {
    // Revenue trends (monthly for last 6 months)
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const revenueTrends = await Order.aggregate([
      { $match: { isDeleted: false, createdAt: { $gte: sixMonthsAgo } } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          revenue: { $sum: { $multiply: ["$products.quantity", "$productInfo.price"] } },
          orders: { $addToSet: "$_id" }
        }
      },
      {
        $project: {
          month: "$_id.month",
          year: "$_id.year",
          revenue: 1,
          orderCount: { $size: "$orders" },
          _id: 0
        }
      },
      { $sort: { year: 1, month: 1 } }
    ]);

    // Conversion rate: (orders/visits) - visits not tracked, so return null or dummy
    const totalOrders = await Order.countDocuments({ isDeleted: false });
    // For demo, assume 5000 visits per month
    const conversionRates = revenueTrends.map(rt => ({
      month: `${rt.year}-${String(rt.month).padStart(2, "0")}`,
      rate: ((rt.orderCount / 5000) * 100).toFixed(2)
    }));

    // Top customers (by revenue)
    const topCustomersAgg = await Order.aggregate([
      { $match: { isDeleted: false } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: "$userId",
          revenue: { $sum: { $multiply: ["$products.quantity", "$productInfo.price"] } },
          orders: { $addToSet: "$_id" }
        }
      },
      {
        $project: {
          userId: "$_id",
          revenue: 1,
          orderCount: { $size: "$orders" },
          _id: 0
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 }
    ]);
    // Populate user names
    const User = require('../models/User');
    const topCustomers = await Promise.all(topCustomersAgg.map(async c => {
      const user = await User.findById(c.userId);
      return {
        name: user ? user.name : 'Unknown',
        orders: c.orderCount,
        revenue: c.revenue
      };
    }));

    // Average order value
    const avgOrderValueAgg = await Order.aggregate([
      { $match: { isDeleted: false } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      { $unwind: "$productInfo" },
      {
        $group: {
          _id: "$_id",
          orderTotal: { $sum: { $multiply: ["$products.quantity", "$productInfo.price"] } }
        }
      }
    ]);
    const avgOrderValue = avgOrderValueAgg.length
      ? (avgOrderValueAgg.reduce((sum, o) => sum + o.orderTotal, 0) / avgOrderValueAgg.length).toFixed(2)
      : 0;

    // --- Additional analytics ---
    // Top Categories (by order count)
    const topCategoriesAgg = await Order.aggregate([
      { $match: { isDeleted: false } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      { $unwind: "$productInfo" },
      {
        $lookup: {
          from: "categories",
          localField: "productInfo.category",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      { $unwind: "$categoryInfo" },
      {
        $group: {
          _id: "$categoryInfo.name",
          value: { $sum: "$products.quantity" }
        }
      },
      { $sort: { value: -1 } },
      { $limit: 5 }
    ]);
    const topCategories = topCategoriesAgg.map(c => ({ name: c._id, value: c.value }));

    // User Registrations by month (last 6 months)
    const userRegAgg = await require('../models/User').aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo }, isDeleted: false } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
          users: { $sum: 1 }
        }
      },
      {
        $project: {
          month: "$_id.month",
          year: "$_id.year",
          users: 1,
          _id: 0
        }
      },
      { $sort: { year: 1, month: 1 } }
    ]);
    const userRegistrations = userRegAgg.map(u => ({ month: `${u.year}-${String(u.month).padStart(2, "0")}`, users: u.users }));

    // Order Status breakdown
    const orderStatusAgg = await Order.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$status",
          value: { $sum: 1 }
        }
      }
    ]);
    const orderStatus = orderStatusAgg.map(s => ({ name: s._id.charAt(0).toUpperCase() + s._id.slice(1), value: s.value }));

    res.json({
      revenueTrends,
      conversionRates,
      topCustomers,
      avgOrderValue,
      topCategories,
      userRegistrations,
      orderStatus
    });
  } catch (err) {
    next(err);
  }
};
