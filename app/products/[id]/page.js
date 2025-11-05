'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaStar, FaShoppingCart, FaWhatsapp } from 'react-icons/fa'

export default function ProductDetail({ params }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('White')

  const product = {
    id: params.id,
    name: 'Corporate Cotton T-Shirt',
    price: 12.99,
    description: 'Premium quality cotton t-shirt perfect for corporate uniforms. Made with 100% cotton fabric for comfort and durability.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Gray', 'Red'],
    bulkPricing: [
      { min: 1, max: 49, price: 12.99 },
      { min: 50, max: 99, price: 11.99 },
      { min: 100, max: 249, price: 10.99 },
      { min: 250, max: 499, price: 9.99 },
      { min: 500, max: 999, price: 8.99 },
      { min: 1000, max: null, price: 7.99 }
    ]
  }

  const getCurrentPrice = () => {
    const tier = product.bulkPricing.find(tier => 
      quantity >= tier.min && (tier.max === null || quantity <= tier.max)
    )
    return tier ? tier.price : product.price
  }

  const handleQuoteRequest = () => {
    const message = `Hi! I'd like to request a quote for:
Product: ${product.name}
Quantity: ${quantity}
Size: ${selectedSize}
Color: ${selectedColor}
Estimated Price: $${(getCurrentPrice() * quantity).toFixed(2)}`
    
    const phoneNumber = '+919558281589'
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <Image 
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={600}
            className="w-full rounded-lg shadow-lg"
          />
          <div className="flex mt-4 space-x-2">
            {product.images.map((image, index) => (
              <Image 
                key={index}
                src={image}
                alt={`${product.name} ${index + 1}`}
                width={100}
                height={100}
                className="w-20 h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-primary"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <span className="ml-2 text-gray-600">(4.8/5 - 124 reviews)</span>
          </div>
          
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Bulk Pricing Table */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Bulk Pricing Tiers</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {product.bulkPricing.map((tier, index) => (
                <div key={index} className="flex justify-between">
                  <span>{tier.min}{tier.max ? `-${tier.max}` : '+'} pcs:</span>
                  <span className="font-semibold">${tier.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-6">
            {/* Size Selection */}
            <div>
              <label className="block font-semibold mb-2">Size:</label>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 border rounded ${
                      selectedSize === size 
                        ? 'bg-primary text-white border-primary' 
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block font-semibold mb-2">Color:</label>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-2 border rounded ${
                      selectedColor === color 
                        ? 'bg-primary text-white border-primary' 
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-semibold mb-2">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-24 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Price Display */}
          <div className="bg-primary text-white p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg">Unit Price:</span>
              <span className="text-2xl font-bold">${getCurrentPrice()}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg">Total ({quantity} pcs):</span>
              <span className="text-3xl font-bold">${(getCurrentPrice() * quantity).toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={handleQuoteRequest}
              className="w-full bg-secondary text-black py-3 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center"
            >
              <FaWhatsapp className="mr-2" />
              Request Quote via WhatsApp
            </button>
            <button className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </div>

          {/* Features */}
          <div className="mt-8 space-y-2 text-sm text-gray-600">
            <p>✓ Free logo printing on orders 100+</p>
            <p>✓ Embroidery available</p>
            <p>✓ Fast 7-14 day delivery</p>
            <p>✓ Bulk discount pricing</p>
            <p>✓ Quality guarantee</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-4">
          {[
            { name: 'John Smith', rating: 5, review: 'Excellent quality! Perfect for our corporate event.' },
            { name: 'Sarah Johnson', rating: 5, review: 'Fast delivery and great bulk pricing. Highly recommend!' },
            { name: 'Mike Davis', rating: 4, review: 'Good quality shirts, will order again for our team.' }
          ].map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">{review.name}</span>
                <div className="flex text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}