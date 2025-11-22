'use client'
import { useState, useEffect } from 'react'
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showVariantModal, setShowVariantModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    category: '',
    brand: '',
    material: '',
    gsm: '',
    status: 'active'
  })

  const [newVariant, setNewVariant] = useState({
    size: '',
    color: '',
    sku: '',
    price: '',
    stock: ''
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
    fetchBrands()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/admin/v1/products?search=${searchTerm}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      })
      const data = await response.json()
      if (data.success) setProducts(data.products)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/v1/categories', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      })
      const data = await response.json()
      if (data.success) setCategories(data.categories)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/admin/v1/brands', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      })
      const data = await response.json()
      if (data.success) setBrands(data.brands)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(newProduct)
      })

      const data = await response.json()
      if (data.success) {
        setProducts([data.product, ...products])
        setShowAddModal(false)
        setNewProduct({ title: '', description: '', category: '', brand: '', material: '', gsm: '', status: 'active' })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleAddVariant = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:3003/api/admin/v1/products/${selectedProduct._id}/variants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(newVariant)
      })

      const data = await response.json()
      if (data.success) {
        fetchProducts()
        setShowVariantModal(false)
        setNewVariant({ size: '', color: '', sku: '', price: '', stock: '' })
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteProduct = async (id) => {
    if (confirm('Delete this product?')) {
      try {
        const response = await fetch(`/api/admin/v1/products/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        })

        const data = await response.json()
        if (data.success) {
          setProducts(products.filter(p => p._id !== id))
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-lg"
            />
          </div>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
          >
            Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Variants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.title}</div>
                    <div className="text-sm text-gray-500">{product.material}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.category?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.variants?.length || 0}
                  <button
                    onClick={() => {
                      setSelectedProduct(product)
                      setShowVariantModal(true)
                    }}
                    className="ml-2 text-blue-600"
                  >
                    Add
                  </button>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-600 mr-3"><FaEdit /></button>
                  <button onClick={() => deleteProduct(product._id)} className="text-red-600"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Add Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Material"
                  value={newProduct.material}
                  onChange={(e) => setNewProduct({...newProduct, material: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="GSM"
                  value={newProduct.gsm}
                  onChange={(e) => setNewProduct({...newProduct, gsm: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
              />
              <div className="flex space-x-3">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showVariantModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Add Variant</h3>
            <form onSubmit={handleAddVariant} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Size"
                  value={newVariant.size}
                  onChange={(e) => setNewVariant({...newVariant, size: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Color"
                  value={newVariant.color}
                  onChange={(e) => setNewVariant({...newVariant, color: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="SKU"
                  value={newVariant.sku}
                  onChange={(e) => setNewVariant({...newVariant, sku: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newVariant.price}
                  onChange={(e) => setNewVariant({...newVariant, price: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={newVariant.stock}
                  onChange={(e) => setNewVariant({...newVariant, stock: e.target.value})}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex space-x-3">
                <button type="submit" className="flex-1 bg-green-600 text-white py-2 rounded-lg">
                  Add Variant
                </button>
                <button
                  type="button"
                  onClick={() => setShowVariantModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}