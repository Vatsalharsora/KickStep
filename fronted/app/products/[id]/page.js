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
      
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Images */}
            <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
              <div className="sticky top-4">
                <div className="mb-3">
                  <Image 
                    src={product.colorImages[selectedColor]}
                    alt={`${product.name} - ${selectedColor}`}
                    width={400}
                    height={400}
                    className="w-full aspect-square object-cover rounded-lg shadow-md transition-all duration-300"
                  />
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  {product.colors.map((color) => (
                    <div key={color} className="relative group">
                      <Image 
                        src={product.colorImages[color]}
                        alt={`${product.name} - ${color}`}
                        width={60}
                        height={60}
                        className={`w-full aspect-square object-cover rounded-md cursor-pointer border-2 transition-all duration-300 ${
                          selectedColor === color 
                            ? 'border-primary shadow-md ring-1 ring-primary' 
                            : 'border-gray-200 hover:border-primary'
                        }`}
                        onClick={() => setSelectedColor(color)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-md transition-all duration-300" />
                      <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">In Stock</span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">Fast Delivery</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-lg" />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm font-medium">(4.8/5)</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 text-sm">124 reviews</span>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{product.description}</p>
              </div>

              {/* Bulk Pricing Table */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg mb-4 border border-blue-100">
                <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                  <span className="bg-blue-500 text-white p-1 rounded mr-2 text-xs">
                    💰
                  </span>
                  Bulk Pricing
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {product.bulkPricing.map((tier, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
                      <span className="font-medium text-gray-700 text-xs">{tier.min}{tier.max ? `-${tier.max}` : '+'}</span>
                      <span className="font-bold text-primary text-sm">${tier.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-4">
                {/* Size Selection */}
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-3">Size:</label>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-3 border rounded-lg font-semibold text-sm transition-all duration-300 ${
                          selectedSize === size 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-3">
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
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                            colorClasses[color]
                          } ${
                            selectedColor === color 
                              ? 'ring-2 ring-primary ring-offset-1' 
                              : 'hover:scale-105'
                          }`}
                          title={color}
                        />
                      )
                    })}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-base font-bold text-gray-900 mb-3">Quantity:</label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center font-bold text-lg transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-16 h-8 text-center text-base font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center font-bold text-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-r from-primary to-blue-700 text-white p-3 rounded-lg mb-4 shadow-md">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium opacity-90">Unit Price:</span>
                  <span className="text-base font-bold">${getCurrentPrice()}</span>
                </div>
                <hr className="border-white border-opacity-20 mb-1" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total ({quantity} pcs):</span>
                  <span className="text-lg font-bold">${(getCurrentPrice() * quantity).toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button 
                  onClick={addToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-sm font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center shadow-md"
                >
                  <FaShoppingCart className="mr-2 text-sm" />
                  Add to Cart
                </button>
                
                <button 
                  onClick={handleQuoteRequest}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 rounded-lg text-sm font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center shadow-md"
                >
                  <FaWhatsapp className="mr-2 text-sm" />
                  Request Quote via WhatsApp
                </button>
              </div>

              {/* Features */}
              <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Why Choose Us?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2 text-sm">✓</span>
                    <span className="text-xs">Free logo printing on orders 100+</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2 text-sm">✓</span>
                    <span className="text-xs">Embroidery available</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2 text-sm">✓</span>
                    <span className="text-xs">Fast 7-14 day delivery</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2 text-sm">✓</span>
                    <span className="text-xs">Bulk discount pricing</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2 text-sm">✓</span>
                    <span className="text-xs">Quality guarantee</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2 text-sm">✓</span>
                    <span className="text-xs">100% Cotton fabric</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Similar Products Section */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold text-center mb-4 text-gray-900">Similar Products</h2>
          <div className="flex overflow-x-auto space-x-3 pb-2 scrollbar-hide">
            {[
              { id: 2, name: 'Polo Shirt', price: 15.99, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300' },
              { id: 3, name: 'Hoodie', price: 24.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300' },
              { id: 4, name: 'Tank Top', price: 9.99, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300' },
              { id: 5, name: 'Long Sleeve', price: 16.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300' },
              { id: 6, name: 'V-Neck Tee', price: 13.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300' },
              { id: 7, name: 'Sweatshirt', price: 22.99, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300' }
            ].map((item) => (
              <div 
                key={item.id} 
                className="bg-gray-50 rounded-lg p-2 hover:shadow-md transition-all duration-300 cursor-pointer flex-shrink-0 w-32"
                onClick={() => window.location.href = `/products/${item.id}`}
              >
                <Image 
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="w-full aspect-square object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-gray-900 text-xs mb-1 truncate">{item.name}</h3>
                <p className="text-primary font-bold text-xs">From ${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-bold text-center mb-4 text-gray-900">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { name: 'John Smith', rating: 5, review: 'Excellent quality! Perfect for our corporate event.', avatar: 'JS' },
              { name: 'Sarah Johnson', rating: 5, review: 'Fast delivery and great bulk pricing. Highly recommend!', avatar: 'SJ' },
              { name: 'Mike Davis', rating: 4, review: 'Good quality shirts, will order again for our team.', avatar: 'MD' }
            ].map((review, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-3 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mr-2 text-xs">
                    {review.avatar}
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block text-xs">{review.name}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className="text-xs" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed text-xs">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}