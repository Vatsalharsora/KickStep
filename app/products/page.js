'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFilter, FaSearch } from 'react-icons/fa'

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
      
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <select 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
          
          {/* Color Filter */}
          <select 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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
          
          {/* Price Range */}
          <select 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <Image 
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-primary">${product.price}</span>
                <span className="text-sm text-gray-500 capitalize">{product.color}</span>
              </div>
              <div className="space-y-2">
                <Link 
                  href={`/products/${product.id}`}
                  className="block w-full bg-primary text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
                <button className="w-full bg-secondary text-black py-2 rounded hover:bg-yellow-500 transition-colors">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Order CTA */}
      <div className="bg-primary text-white p-8 rounded-lg text-center mt-12">
        <h2 className="text-3xl font-bold mb-4">Need Bulk Orders?</h2>
        <p className="text-xl mb-6">Get better pricing for orders of 50+ items</p>
        <Link href="/contact" className="bg-secondary text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition-colors">
          Contact for Bulk Pricing
        </Link>
      </div>
    </div>
  )
}