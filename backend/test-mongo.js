const mongoose = require('mongoose');

// Simple test to check MongoDB connection and save data
async function testMongoDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/kickstepss');
    console.log('✅ Connected to MongoDB');

    // Simple product schema for testing
    const TestProductSchema = new mongoose.Schema({
      title: { type: String, required: true },
      description: String,
      status: { type: String, default: 'draft' }
    });

    const TestProduct = mongoose.model('TestProduct', TestProductSchema);

    // Create and save a test product
    const testProduct = new TestProduct({
      title: 'Test Product',
      description: 'This is a test product',
      status: 'draft'
    });

    const saved = await testProduct.save();
    console.log('✅ Test product saved:', saved._id);

    // Fetch all test products
    const products = await TestProduct.find();
    console.log('📦 Found products:', products.length);

    mongoose.connection.close();
    console.log('✅ Test completed successfully');
  } catch (error) {
    console.error('❌ MongoDB test failed:', error.message);
    process.exit(1);
  }
}

testMongoDB();