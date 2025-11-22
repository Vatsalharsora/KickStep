const Product = require('../model/productmodel');
const Category = require('../model/categorymodel');
const Brand = require('../model/brandmodel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads/products');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Product CRUD
const createProduct = async (req, res) => {
  try {
    console.log('=== PRODUCT CREATION START ===');
    console.log('Request body:', req.body);
    console.log('Files:', req.files);
    
    if (!req.body.title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    
    const productData = {
      title: req.body.title,
      description: req.body.description || '',
      material: req.body.material || '',
      gsm: req.body.gsm ? parseInt(req.body.gsm) : undefined,
      status: req.body.status || 'draft',
      images: req.files ? req.files.map(file => file.filename) : []
    };
    
    console.log('Processed product data:', productData);
    
    const product = new Product(productData);
    const savedProduct = await product.save();
    
    console.log('✅ Product saved with ID:', savedProduct._id);
    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    console.error('❌ Error creating product:', error.message);
    console.error('Full error:', error);
    res.status(400).json({ success: false, message: error.message || 'Unknown error' });
  }
};

const getProducts = async (req, res) => {
  try {
    console.log('Fetching products...');
    const { search, category, brand, status, page = 1, limit = 10 } = req.query;
    const filter = {};
    
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (status) filter.status = status;

    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);
    
    console.log(`Found ${products.length} products`);
    res.json({
      success: true,
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Variant management
const addVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    product.variants.push(req.body);
    await product.save();
    
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    const variant = product.variants.id(req.params.variantId);
    if (!variant) {
      return res.status(404).json({ success: false, message: 'Variant not found' });
    }
    
    Object.assign(variant, req.body);
    await product.save();
    
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    product.variants.id(req.params.variantId).remove();
    await product.save();
    
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('parent', 'name');
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Brands
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json({ success: true, brands });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBrand = async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json({ success: true, brand });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const createSimpleProduct = async (req, res) => {
  try {
    console.log('Simple product request:', req.body);
    
    const productData = {
      title: req.body.title || 'Test Product ' + Date.now(),
      description: req.body.description || 'Test Description',
      material: req.body.material || '',
      status: req.body.status || 'draft'
    };
    
    console.log('Creating product with data:', productData);
    
    const product = new Product(productData);
    const saved = await product.save();
    
    console.log('✅ Product saved to MongoDB:', saved._id);
    
    res.json({ 
      success: true, 
      message: 'Product saved to MongoDB successfully!',
      product: saved 
    });
  } catch (error) {
    console.error('❌ Product creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to save product',
      error: error.toString()
    });
  }
};

module.exports = {
  createProduct,
  createSimpleProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addVariant,
  updateVariant,
  deleteVariant,
  getCategories,
  createCategory,
  getBrands,
  createBrand,
  upload
};