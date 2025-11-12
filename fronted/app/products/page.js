'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFilter, FaSearch, FaShoppingCart, FaShoppingBag, FaPhone } from 'react-icons/fa'

const products = [
  { id: 1, name: 'Corporate Cotton Tee', price: 12.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', category: 'cotton', color: 'white' },
  { id: 2, name: 'Premium Polo Shirt', price: 18.99, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400', category: 'polo', color: 'blue' },
  { id: 3, name: 'Executive Dress Shirt', price: 24.99, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400', category: 'dress', color: 'white' },
  { id: 4, name: 'Casual Work Tee', price: 14.99, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400', category: 'cotton', color: 'gray' },
  { id: 5, name: 'Sports Team Jersey', price: 22.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400', category: 'sports', color: 'red' },
  { id: 6, name: 'Uniform Polo', price: 16.99, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', category: 'polo', color: 'navy' },
  { id: 7, name: 'Event Staff Tee', price: 13.99, image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400', category: 'cotton', color: 'black' },
  { id: 8, name: 'Manager Polo', price: 19.99, image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400', category: 'polo', color: 'white' },
  { id: 9, name: 'Security Uniform', price: 21.99, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400', category: 'uniform', color: 'black' },
  { id: 10, name: 'School Spirit Tee', price: 15.99, image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400', category: 'cotton', color: 'green' }
]

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filters, setFilters] = useState({ category: '', color: '', priceRange: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [addedMessage, setAddedMessage] = useState('')

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1, size: 'M', color: product.color })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cartUpdated'))
    
    setAddedMessage(`${product.name} added to cart!`)
    setTimeout(() => setAddedMessage(''), 3000)
  }

  const handleFilter = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    
    let filtered = products.filter(product => {
      return (
        (newFilters.category === '' || product.category === newFilters.category) &&
        (newFilters.color === '' || product.color === newFilters.color) &&
        (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })
    
    setFilteredProducts(filtered)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    let filtered = products.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase()) &&
      (filters.category === '' || product.category === filters.category) &&
      (filters.color === '' || product.color === filters.color)
    )
    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center bg-white/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6 animate-bounce">
            <FaShoppingBag className="text-lg sm:text-xl mr-2" />
            <span className="text-xs sm:text-sm font-semibold">Premium Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">Our Premium Collection</h1>
          <p className="text-lg sm:text-xl lg:text-2xl opacity-90 mb-6">Corporate T-Shirts & Bulk Uniforms</p>
          <div className="flex justify-center items-center space-x-8 text-sm">
            <div className="flex items-center">
              <span className="bg-white bg-opacity-20 p-2 rounded-full mr-2">✓</span>
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center">
              <span className="bg-white bg-opacity-20 p-2 rounded-full mr-2">✓</span>
              <span>Bulk Discounts</span>
            </div>
            <div className="flex items-center">
              <span className="bg-white bg-opacity-20 p-2 rounded-full mr-2">✓</span>
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {addedMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl shadow-sm">
            <div className="flex items-center text-green-700">
              <FaShoppingCart className="mr-2" />
              {addedMessage}
            </div>
          </div>
        )}
        
        {/* Search and Filters */}
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Perfect Product</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Search */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <div className="relative">
                <FaSearch className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                value={filters.category}
                onChange={(e) => handleFilter('category', e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="cotton">Cotton Tees</option>
                <option value="polo">Polo Shirts</option>
                <option value="dress">Dress Shirts</option>
                <option value="sports">Sports Jerseys</option>
                <option value="uniform">Uniforms</option>
              </select>
            </div>
            
            {/* Color Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <select 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                value={filters.color}
                onChange={(e) => handleFilter('color', e.target.value)}
              >
                <option value="">All Colors</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="gray">Gray</option>
                <option value="navy">Navy</option>
                <option value="green">Green</option>
              </select>
            </div>
            
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select 
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                value={filters.priceRange}
                onChange={(e) => handleFilter('priceRange', e.target.value)}
              >
                <option value="">All Prices</option>
                <option value="0-15">$0 - $15</option>
                <option value="15-20">$15 - $20</option>
                <option value="20+">$20+</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredProducts.length}</span> products
            </p>
            <button 
              onClick={() => {
                setFilters({ category: '', color: '', priceRange: '' })
                setSearchTerm('')
                setFilteredProducts(products)
              }}
              className="text-primary hover:text-blue-700 font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/50">
              <div className="relative overflow-hidden">
                <Image 
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="text-sm font-bold">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                  </div>
                </div>
                
                {/* Color Indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`w-8 h-8 rounded-full border-3 border-white shadow-lg ${
                    product.color === 'white' ? 'bg-gray-100' :
                    product.color === 'black' ? 'bg-black' :
                    product.color === 'blue' ? 'bg-blue-500' :
                    product.color === 'red' ? 'bg-red-500' :
                    product.color === 'gray' ? 'bg-gray-500' :
                    product.color === 'navy' ? 'bg-blue-900' :
                    product.color === 'green' ? 'bg-green-500' : 'bg-gray-300'
                  }`} title={product.color}>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.color}
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-4 w-4 h-4 bg-white/20 rounded-full animate-bounce"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 capitalize flex items-center">
                  <span className="w-2 h-2 rounded-full mr-2 ${
                    product.color === 'white' ? 'bg-gray-100 border border-gray-300' :
                    product.color === 'black' ? 'bg-black' :
                    product.color === 'blue' ? 'bg-blue-500' :
                    product.color === 'red' ? 'bg-red-500' :
                    product.color === 'gray' ? 'bg-gray-500' :
                    product.color === 'navy' ? 'bg-blue-900' :
                    product.color === 'green' ? 'bg-green-500' : 'bg-gray-300'
                  }"></span>
                  {product.color}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <span className="text-gray-500 text-xs ml-1">/ pc</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Bulk</div>
                    <div className="text-sm font-bold text-green-600">$8.99</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link 
                    href={`/products/${product.id}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-1.5 sm:py-2 lg:py-2.5 rounded-md sm:rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-xs sm:text-sm lg:text-base"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-1.5 sm:py-2 lg:py-2.5 rounded-md sm:rounded-lg font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-1 text-xs sm:text-sm lg:text-base"
                  >
                    <FaShoppingCart className="text-xs sm:text-sm" />
                    <span>Add Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        
        {/* Bulk Order CTA */}
        <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-12 rounded-3xl text-center mt-16 shadow-2xl overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-float blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full animate-bounce blur-lg"></div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center bg-white/20 rounded-full px-6 py-2 mb-6 animate-bounce">
              <span className="text-2xl mr-2">🏭</span>
              <span className="text-sm font-semibold">Bulk Orders</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Need Bulk Orders?</h2>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">Get better pricing for orders of 50+ items with custom branding options</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💰</div>
                <h3 className="font-bold mb-2 text-lg">Best Prices</h3>
                <p className="text-sm opacity-90">Up to 40% off on bulk orders</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎨</div>
                <h3 className="font-bold mb-2 text-lg">Custom Branding</h3>
                <p className="text-sm opacity-90">Logo printing & embroidery</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🚚</div>
                <h3 className="font-bold mb-2 text-lg">Fast Delivery</h3>
                <p className="text-sm opacity-90">7-14 days nationwide</p>
              </div>
            </div>
            
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <FaPhone className="mr-3" style={{transform: 'scaleX(-1)'}} />
              Get Bulk Pricing Quote
              <span className="ml-3">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}