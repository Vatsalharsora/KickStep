'use client'
import { useState, useEffect } from 'react'
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({})
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchDashboardStats()
    if (activeTab === 'products') fetchProducts()
    if (activeTab === 'orders') fetchOrders()
  }, [activeTab])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/v1/dashboard/stats', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      })
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/v1/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      })
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/v1/orders', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      })
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-blue-500 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100">Total Revenue</p>
            <p className="text-3xl font-bold">₹{stats.totalRevenue?.toLocaleString()}</p>
          </div>
          <FaDollarSign className="text-4xl text-blue-200" />
        </div>
      </div>
      <div className="bg-green-500 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">Today's Orders</p>
            <p className="text-3xl font-bold">{stats.todayOrders}</p>
          </div>
          <FaShoppingCart className="text-4xl text-green-200" />
        </div>
      </div>
      <div className="bg-orange-500 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100">Pending Orders</p>
            <p className="text-3xl font-bold">{stats.pendingOrders}</p>
          </div>
          <FaShoppingCart className="text-4xl text-orange-200" />
        </div>
      </div>
      <div className="bg-red-500 text-white p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-100">Low Stock Items</p>
            <p className="text-3xl font-bold">{stats.lowStockItems}</p>
          </div>
          <FaBox className="text-4xl text-red-200" />
        </div>
      </div>
    </div>
  )

  const renderProducts = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Products</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg">
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.title}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{product.category?.name || 'N/A'}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <button className="text-blue-600 mr-3"><FaEdit /></button>
                <button className="text-red-600"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderOrders = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Orders</h2>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Buyer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.orderNumber}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{order.buyer?.companyName}</td>
              <td className="px-6 py-4 text-sm text-gray-500">₹{order.total?.toLocaleString()}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="h-screen flex bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="p-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: FaDollarSign },
            { id: 'products', label: 'Products', icon: FaBox },
            { id: 'orders', label: 'Orders', icon: FaShoppingCart },
            { id: 'buyers', label: 'Buyers', icon: FaUsers }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg text-left ${
                activeTab === item.id ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'buyers' && <div className="bg-white p-6 rounded-lg shadow">Buyers management coming soon</div>}
      </div>
    </div>
  )
}