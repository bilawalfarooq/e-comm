const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

exports.getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
    res.json(wishlist || { products: [] });
  } catch (err) {
    next(err);
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.id, products: [] });
    }
    if (!wishlist.products.includes(req.body.productId)) {
      wishlist.products.push(req.body.productId);
      await wishlist.save();
    }
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { userId: req.user.id },
      { $pull: { products: req.body.productId } },
      { new: true }
    );
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
};
