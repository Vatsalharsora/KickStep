const Order = require('../model/ordermodel');
const Buyer = require('../model/buyermodel');
const Product = require('../model/productmodel');

const createOrder = async (req, res) => {
  try {
    const { buyer, items, notes } = req.body;
    
    // Generate order number
    const orderCount = await Order.countDocuments();
    const orderNumber = `ORD-${Date.now()}-${orderCount + 1}`;
    
    // Calculate totals
    let subtotal = 0;
    const processedItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.product);
      const variant = product.variants.id(item.variant);
      
      if (!variant || variant.stock < item.quantity) {
        return res.status(400).json({ 
          success: false, 
          message: `Insufficient stock for ${product.title}` 
        });
      }
      
      const itemTotal = item.quantity * variant.price;
      subtotal += itemTotal;
      
      processedItems.push({
        product: item.product,
        variant: item.variant,
        quantity: item.quantity,
        price: variant.price,
        total: itemTotal
      });
      
      // Update stock
      variant.stock -= item.quantity;
      await product.save();
    }
    
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;
    
    const order = new Order({
      orderNumber,
      buyer,
      items: processedItems,
      subtotal,
      tax,
      total,
      notes,
      createdBy: req.user.id
    });
    
    await order.save();
    await order.populate('buyer items.product');
    
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const { status, buyer, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (buyer) filter.buyer = buyer;
    
    const orders = await Order.find(filter)
      .populate('buyer', 'companyName contactPerson email')
      .populate('items.product', 'title')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Order.countDocuments(filter);
    
    res.json({
      success: true,
      orders,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer')
      .populate('items.product')
      .populate('createdBy', 'fullName');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber, notes } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, trackingNumber, notes },
      { new: true }
    ).populate('buyer items.product');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    if (order.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: 'Only pending orders can be cancelled' 
      });
    }
    
    // Restore stock
    for (const item of order.items) {
      const product = await Product.findById(item.product._id);
      const variant = product.variants.id(item.variant);
      variant.stock += item.quantity;
      await product.save();
    }
    
    order.status = 'cancelled';
    await order.save();
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const totalOrders = await Order.countDocuments();
    const todayOrders = await Order.countDocuments({ createdAt: { $gte: today } });
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    
    const revenueData = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          status: { $ne: 'cancelled' },
          createdAt: { $gte: new Date(today.getFullYear(), today.getMonth(), 1) }
        }
      },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalOrders,
        todayOrders,
        pendingOrders,
        totalRevenue: revenueData[0]?.total || 0,
        monthlyRevenue: monthlyRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getDashboardStats
};