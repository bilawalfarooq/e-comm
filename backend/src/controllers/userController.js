const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// Get all users (admin only)
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isDeleted: false }).select('-password');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Get single user (admin or self)
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id, isDeleted: false }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (req.user.role !== 'admin' && req.user.id !== user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Update user (admin or self)
exports.updateUser = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      updates,
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (req.user.role !== 'admin' && req.user.id !== user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Soft delete user (admin or self)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (req.user.role !== 'admin' && req.user.id !== user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};

// Admin create user with role
exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role: role || 'user' });
    await user.save();
    res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
};
