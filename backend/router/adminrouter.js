const router = require('express').Router();
const adminController = require('../controller/admincontroller');
const productController = require('../controller/productcontroller');
const { vaildateuser } = require('../middleware/Authmiddleware');

// No auth middleware for testing

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);

// Products
router.get('/products', productController.getProducts);
router.post('/products', productController.upload.array('images', 10), productController.createProduct);
router.post('/products/simple', productController.createSimpleProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Product Variants
router.post('/products/:id/variants', productController.addVariant);
router.put('/products/:id/variants/:variantId', productController.updateVariant);
router.delete('/products/:id/variants/:variantId', productController.deleteVariant);

// Categories & Brands
router.get('/categories', productController.getCategories);
router.post('/categories', productController.createCategory);
router.get('/brands', productController.getBrands);
router.post('/brands', productController.createBrand);

// Orders
const orderController = require('../controller/ordercontroller');
router.get('/orders', orderController.getOrders);
router.post('/orders', orderController.createOrder);
router.get('/orders/:id', orderController.getOrderById);
router.put('/orders/:id/status', orderController.updateOrderStatus);
router.post('/orders/:id/cancel', orderController.cancelOrder);
router.get('/dashboard/stats', orderController.getDashboardStats);

// Buyers
router.get('/buyers', adminController.getBuyers);
router.post('/buyers', adminController.createBuyer);

module.exports = router;