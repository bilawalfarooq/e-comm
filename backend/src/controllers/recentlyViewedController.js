const RecentlyViewed = require('../models/RecentlyViewed');

exports.getRecentlyViewed = async (req, res, next) => {
  try {
    const rv = await RecentlyViewed.findOne({ userId: req.user.id }).populate('products.product');
    res.json(rv || { products: [] });
  } catch (err) {
    next(err);
  }
};

exports.addRecentlyViewed = async (req, res, next) => {
  try {
    let rv = await RecentlyViewed.findOne({ userId: req.user.id });
    if (!rv) {
      rv = new RecentlyViewed({ userId: req.user.id, products: [] });
    }
    // Remove if already exists
    rv.products = rv.products.filter(p => p.product.toString() !== req.body.productId);
    // Add to front
    rv.products.unshift({ product: req.body.productId, viewedAt: new Date() });
    // Limit to 10
    rv.products = rv.products.slice(0, 10);
    await rv.save();
    res.json(rv);
  } catch (err) {
    next(err);
  }
};
