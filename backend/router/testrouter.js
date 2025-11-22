const router = require('express').Router();
const Product = require('../model/productmodel');

// Simple test route without auth
router.post('/add-product', async (req, res) => {
  try {
    console.log('Test product creation:', req.body);
    
    const product = new Product({
      title: req.body.title || 'Test Product ' + Date.now(),
      description: req.body.description || 'Test Description',
      material: req.body.material || '',
      status: req.body.status || 'draft',
      variants: [{
        size: 'M',
        color: 'Default',
        sku: 'TEST-' + Date.now(),
        price: 100,
        stock: 10
      }]
    });
    
    const saved = await product.save();
    console.log('✅ Product saved:', saved._id);
    
    res.json({ 
      success: true, 
      message: 'Product saved to MongoDB!',
      product: saved 
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;