const mongoose = require('mongoose');

const tierPricingSchema = new mongoose.Schema({
  minQuantity: { type: Number, required: true },
  maxQuantity: { type: Number },
  price: { type: Number, required: true }
});

const variantSchema = new mongoose.Schema({
  size: String,
  color: String,
  sku: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  tierPricing: [tierPricingSchema]
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
  material: String,
  gsm: Number,
  images: [String],
  variants: [variantSchema],
  status: { type: String, enum: ['active', 'draft'], default: 'active' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);