'use client'
import { useState } from 'react'
import Image from 'next/image'
import { FaStar, FaShoppingCart, FaWhatsapp } from 'react-icons/fa'

export default function ProductDetail({ params }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('White')
  const [addedMessage, setAddedMessage] = useState('')

  const product = {
    id: params.id,
    name: 'Corporate Cotton T-Shirt',
    price: 12.99,
    description: 'Premium quality cotton t-shirt perfect for corporate uniforms. Made with 100% cotton fabric for comfort and durability.',
    colorImages: {
      'White': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
      'Black': 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600',
      'Navy': 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600',
      'Gray': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
      'Red': 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600'
    },
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

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const cartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      productId: product.id,
      name: product.name,
      price: getCurrentPrice(),
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.colorImages[selectedColor]
    }
    
    const existingItem = cart.find(item => 
      item.productId === product.id && item.size === selectedSize && item.color === selectedColor
    )
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push(cartItem)
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    
    setAddedMessage(`${product.name} (${selectedSize}, ${selectedColor}) added to cart!`)
    setTimeout(() => setAddedMessage(''), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {addedMessage && (
        <div className="container mx-auto px-4 pt-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-700">
              <FaShoppingCart className="mr-2" />
              {addedMessage}
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Images */}
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="sticky top-8">
                <div className="mb-6">
                  <Image 
                    src={product.colorImages[selectedColor]}
                    alt={`${product.name} - ${selectedColor}`}
                    width={600}
                    height={600}
                    className="w-full aspect-square object-cover rounded-xl shadow-lg transition-all duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="grid grid-cols-5 gap-3">
                  {product.colors.map((color) => (
                    <div key={color} className="relative group">
                      <Image 
                        src={product.colorImages[color]}
                        alt={`${product.name} - ${color}`}
                        width={100}
                        height={100}
                        className={`w-full aspect-square object-cover rounded-lg cursor-pointer border-3 transition-all duration-300 ${
                          selectedColor === color 
                            ? 'border-primary shadow-lg ring-2 ring-primary ring-offset-2' 
                            : 'border-gray-200 hover:border-primary hover:shadow-md'
                        }`}
                        onClick={() => setSelectedColor(color)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300" />
                      <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">In Stock</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">Fast Delivery</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-lg" />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">(4.8/5)</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">124 reviews</span>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-8">{product.description}</p>
              </div>

              {/* Bulk Pricing Table */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-500 text-white p-2 rounded-lg mr-3">
                    💰
                  </span>
                  Bulk Pricing Tiers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.bulkPricing.map((tier, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="font-medium text-gray-700">{tier.min}{tier.max ? `-${tier.max}` : '+'} pcs</span>
                      <span className="font-bold text-primary text-lg">${tier.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-8 mb-8">
                {/* Size Selection */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">Size:</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 px-4 border-2 rounded-xl font-bold transition-all duration-300 ${
                          selectedSize === size 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg transform scale-105' 
                            : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">
                    Color: <span className="text-primary">{selectedColor}</span>
                  </label>
                  <div className="flex space-x-4">
                    {product.colors.map((color) => {
                      const colorClasses = {
                        'White': 'bg-white border-gray-400',
                        'Black': 'bg-black border-gray-800',
                        'Navy': 'bg-blue-900 border-blue-900',
                        'Gray': 'bg-gray-500 border-gray-500',
                        'Red': 'bg-red-500 border-red-500'
                      }
                      
                      return (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-12 h-12 rounded-full border-3 transition-all duration-300 ${
                            colorClasses[color]
                          } ${
                            selectedColor === color 
                              ? 'ring-4 ring-primary ring-offset-2 scale-110 shadow-lg' 
                              : 'hover:scale-105 hover:shadow-md'
                          }`}
                          title={color}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-4">Quantity:</label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center justify-center font-bold text-xl transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-20 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-xl flex items-center justify-center font-bold text-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-6 rounded-2xl mb-8 shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium opacity-90">Unit Price:</span>
                  <span className="text-3xl font-bold">${getCurrentPrice()}</span>
                </div>
                <hr className="border-white border-opacity-20 mb-3" />
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium">Total ({quantity} pcs):</span>
                  <span className="text-4xl font-bold">${(getCurrentPrice() * quantity).toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button 
                  onClick={addToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaShoppingCart className="mr-3 text-xl" />
                  Add to Cart
                </button>
                
                <button 
                  onClick={handleQuoteRequest}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl text-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaWhatsapp className="mr-3 text-xl" />
                  Request Quote via WhatsApp
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Why Choose Us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3 text-lg">✓</span>
                    <span>Free logo printing on orders 100+</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3 text-lg">✓</span>
                    <span>Embroidery available</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3 text-lg">✓</span>
                    <span>Fast 7-14 day delivery</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3 text-lg">✓</span>
                    <span>Bulk discount pricing</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3 text-lg">✓</span>
                    <span>Quality guarantee</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-3 text-lg">✓</span>
                    <span>100% Cotton fabric</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Reviews Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'John Smith', rating: 5, review: 'Excellent quality! Perfect for our corporate event.', avatar: 'JS' },
              { name: 'Sarah Johnson', rating: 5, review: 'Fast delivery and great bulk pricing. Highly recommend!', avatar: 'SJ' },
              { name: 'Mike Davis', rating: 4, review: 'Good quality shirts, will order again for our team.', avatar: 'MD' }
            ].map((review, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {review.avatar}
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">{review.name}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}