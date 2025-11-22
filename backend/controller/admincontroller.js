const Product = require('../model/productmodel');
const Category = require('../model/categorymodel');
const Order = require('../model/ordermodel');
const Buyer = require('../model/buyermodel');

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const lowStockProducts = await Product.aggregate([
      { $unwind: '$variants' },
      { $match: { 'variants.stock': { $lt: 10 } } },
      { $count: 'count' }
    ]);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      todayOrders,
      pendingOrders,
      lowStockItems: lowStockProducts[0]?.count || 0,
      totalOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Products
const getProducts = async (req, res) => {
  try {
    const { search, category, brand, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const products = await Product.find(filter)
      .populate('category brand')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);
    
    res.json({ products, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, createdBy: req.user.id });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Orders
const getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = status ? { status } : {};

    const orders = await Order.find(filter)
      .populate('buyer', 'companyName contactPerson')
      .populate('items.product', 'title')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(filter);
    
    res.json({ orders, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id, 
      { status, trackingNumber }, 
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Buyers
const getBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find().sort({ createdAt: -1 });
    res.json(buyers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBuyer = async (req, res) => {
  try {
    const buyer = new Buyer(req.body);
    await buyer.save();
    res.status(201).json(buyer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrderStatus,
  getBuyers,
  createBuyer
};