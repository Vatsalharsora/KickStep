'use client'
import { useState, useEffect } from 'react'
import { 
  FaUsers, FaPlus, FaSignOutAlt, FaTachometerAlt, FaBox, FaShoppingCart, 
  FaChartLine, FaCog, FaTrash, FaEdit, FaUserShield, FaBell, FaSearch,
  FaArrowUp, FaArrowDown, FaDollarSign, FaEye, FaCalendarAlt, FaChartBar, 
  FaBars, FaTimes, FaMoon, FaSun
} from 'react-icons/fa'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [showAddUser, setShowAddUser] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showEditUser, setShowEditUser] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [newUser, setNewUser] = useState({
    fullName: '',
    companyName: '',
    email: '',
    password: '',
    role: 'user'
  })
  const [editUser, setEditUser] = useState({
    fullName: '',
    companyName: '',
    email: '',
    role: 'user'
  })

  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    category: '',
    material: '',
    gsm: '',
    status: 'draft',
    images: null,
    imagePreview: []
  })

  useEffect(() => {
    fetchUsers()
    if (activeTab === 'products') {
      fetchProducts()
      fetchCategories()
    }
  }, [activeTab])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/users/getuser')
      const data = await response.json()
      if (data.status === 'success') {
        setUsers(data.data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      console.log('Fetching products from MongoDB...')
      const response = await fetch('http://localhost:3003/api/test/products')
      const data = await response.json()
      
      if (data.success) {
        console.log('✅ Fetched', data.products.length, 'products from MongoDB')
        setProducts(data.products)
      } else {
        console.error('Failed to fetch products:', data.message)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
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

  const addUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3003/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newUser, agreedToTerms: true })
      })
      const data = await response.json()
      if (data.status === 'success') {
        fetchUsers()
        setShowAddUser(false)
        setNewUser({ fullName: '', companyName: '', email: '', password: '', role: 'user' })
      }
    } catch (error) {
      console.error('Error adding user:', error)
    }
    setLoading(false)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setEditUser({
      fullName: user.fullName,
      companyName: user.companyName || '',
      email: user.email,
      role: user.role
    })
    setShowEditUser(true)
  }

  const updateUser = async (e) => {
    e.preventDefault()
    const userId = selectedUser?._id || selectedUser?.id
    if (!userId) {
      console.error('No user ID found')
      return
    }
    
    setLoading(true)
    try {
      console.log('Updating user with ID:', userId)
      const response = await fetch(`http://localhost:3003/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser)
      })
      if (response.ok) {
        fetchUsers()
        setShowEditUser(false)
        setSelectedUser(null)
      } else {
        console.error('Update failed:', response.status)
      }
    } catch (error) {
      console.error('Error updating user:', error)
    }
    setLoading(false)
  }

  const handleDeleteUser = (user) => {
    console.log('Selected user for deletion:', user)
    console.log('User keys:', Object.keys(user))
    console.log('User _id:', user._id)
    console.log('User id:', user.id)
    setSelectedUser(user)
    setShowDeleteConfirm(true)
  }

  const deleteUser = async () => {
    const userId = selectedUser?._id || selectedUser?.id
    if (!selectedUser || !userId) {
      console.error('No user selected or ID missing')
      console.log('selectedUser:', selectedUser)
      return
    }
    
    setLoading(true)
    try {
      console.log('Deleting user with ID:', userId)
      
      const response = await fetch(`http://localhost:3003/api/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('Delete successful:', data)
        fetchUsers()
        setShowDeleteConfirm(false)
        setSelectedUser(null)
      } else {
        const errorText = await response.text()
        console.error('Delete failed:', response.status, errorText)
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
    setLoading(false)
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    window.location.href = '/admin-portal-2024'
  }

  const addProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (!newProduct.title) {
        alert('Please enter a product title')
        setLoading(false)
        return
      }
      
      console.log('Adding product to MongoDB:', newProduct.title)
      
      const response = await fetch('http://localhost:3003/api/test/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newProduct.title,
          description: newProduct.description,
          material: newProduct.material,
          status: newProduct.status
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        console.log('✅ Product saved to MongoDB:', data.product._id)
        alert(`Product "${data.product.title}" saved to MongoDB!`)
        fetchProducts()
        setShowAddProduct(false)
        setNewProduct({ title: '', description: '', category: '', material: '', gsm: '', status: 'draft', images: null, imagePreview: [] })
      } else {
        alert('Error: ' + data.message)
      }
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product: ' + error.message)
    }
    
    setLoading(false)
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { id: 'users', label: 'User Management', icon: FaUsers },
    { id: 'products', label: 'Products', icon: FaBox },
    { id: 'orders', label: 'Orders', icon: FaShoppingCart },
    { id: 'analytics', label: 'Analytics', icon: FaChartLine },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ]

  // Chart data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  }

  const userGrowthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'New Users',
      data: [45, 52, 38, 67],
      backgroundColor: 'rgba(34, 197, 94, 0.8)'
    }]
  }

  const categoryData = {
    labels: ['Shoes', 'Accessories', 'Apparel', 'Sports'],
    datasets: [{
      data: [35, 25, 25, 15],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
    }]
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Total Users</p>
                    <p className="text-3xl font-bold">{users.length}</p>
                  </div>
                  <FaUsers className="text-4xl text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Products</p>
                    <p className="text-3xl font-bold">{products.length}</p>
                  </div>
                  <FaBox className="text-4xl text-green-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Orders</p>
                    <p className="text-3xl font-bold">89</p>
                  </div>
                  <FaShoppingCart className="text-4xl text-purple-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Revenue</p>
                    <p className="text-3xl font-bold">₹2.4L</p>
                  </div>
                  <FaChartBar className="text-4xl text-orange-200" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">New user registered: john@example.com</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">Order #1234 completed</span>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm">Product inventory updated</span>
                </div>
              </div>
            </div>
          </div>
        )
      case 'users':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Users Management</h2>
              <button
                onClick={() => setShowAddUser(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPlus className="mr-2" /> Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id || user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.companyName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-900 mr-3 p-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'products':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Products Management</h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaPlus className="mr-2" /> Add Product
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={`/uploads/products/${product.images[0]}`} 
                          alt={product.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <FaBox className="text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{product.material}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
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
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
                  <p className="text-gray-600">Comprehensive business insights and metrics</p>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Export Report
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-800">3.2%</p>
                    <p className="text-green-600 text-sm">↑ 0.5% vs last month</p>
                  </div>
                  <FaChartLine className="text-blue-500 text-2xl" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-800">₹2,850</p>
                    <p className="text-green-600 text-sm">↑ ₹150 vs last month</p>
                  </div>
                  <FaDollarSign className="text-green-500 text-2xl" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Customer Retention</p>
                    <p className="text-2xl font-bold text-gray-800">68%</p>
                    <p className="text-red-600 text-sm">↓ 2% vs last month</p>
                  </div>
                  <FaUsers className="text-purple-500 text-2xl" />
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Page Views</p>
                    <p className="text-2xl font-bold text-gray-800">45.2K</p>
                    <p className="text-green-600 text-sm">↑ 8.3% vs last month</p>
                  </div>
                  <FaEye className="text-orange-500 text-2xl" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trends</h3>
              <div className="h-80">
                <Line data={salesData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        )
    }
  }

  return (
    <div className={`h-screen flex transition-all duration-300 overflow-hidden ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-gray-100'
    }`}>
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-72'} flex flex-col h-full transition-all duration-300 relative ${
        darkMode 
          ? 'bg-gray-800 border-r border-gray-700' 
          : 'bg-white border-r border-gray-200'
      } shadow-xl`}>
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`absolute -right-4 top-6 ${
            darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
          } text-white p-3 rounded-full shadow-lg transition-all duration-300 z-20 hover:scale-110`}
        >
          {sidebarCollapsed ? <FaBars className="text-sm" /> : <FaTimes className="text-sm" />}
        </button>
        
        {/* Logo Section */}
        <div className={`${sidebarCollapsed ? 'p-3' : 'p-6'} border-b transition-all duration-300 ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className={`${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            } rounded-lg p-2 shadow-lg transition-all duration-300`}>
              <img src="/kickStepLogo.svg" alt="KickStep" className={`${sidebarCollapsed ? 'w-8 h-8' : 'w-10 h-10'} transition-all duration-300`} />
            </div>
            {!sidebarCollapsed && (
              <div className="ml-3">
                <h2 className={`text-lg font-bold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-800'
                }`}>KickStep</h2>
                <p className={`text-sm transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Admin Portal</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Theme Toggle */}
        {!sidebarCollapsed && (
          <div className="p-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              <span className="text-sm font-medium">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
              {darkMode ? (
                <FaMoon className="text-yellow-400" />
              ) : (
                <FaSun className="text-orange-500" />
              )}
            </button>
          </div>
        )}
        

        
        {/* Navigation */}
        <nav className="px-4 flex-1 overflow-y-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-4'} py-3 mb-2 rounded-lg text-left transition-all duration-300 group ${
                  activeTab === item.id 
                    ? darkMode
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-blue-500 text-white shadow-lg'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <div className={`p-2 rounded-lg ${sidebarCollapsed ? '' : 'mr-3'} transition-all duration-300 ${
                  activeTab === item.id 
                    ? 'bg-blue-500' 
                    : darkMode
                      ? 'bg-gray-700 group-hover:bg-gray-600'
                      : 'bg-gray-200 group-hover:bg-gray-300'
                }`}>
                  <Icon className="text-sm" />
                </div>
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            )
          })}
        </nav>
        
        {/* Logout Button */}
        <div className={`p-4 border-t transition-all duration-300 flex-shrink-0 ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            onClick={logout}
            className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-4'} py-3 rounded-lg transition-all duration-300 group ${
              darkMode
                ? 'text-red-400 hover:bg-red-900/20'
                : 'text-red-600 hover:bg-red-50'
            }`}
            title={sidebarCollapsed ? 'Logout' : ''}
          >
            <div className={`p-2 rounded-lg ${sidebarCollapsed ? '' : 'mr-3'} transition-all duration-300 ${
              darkMode
                ? 'bg-red-900/20 group-hover:bg-red-800/30'
                : 'bg-red-100 group-hover:bg-red-200'
            }`}>
              <FaSignOutAlt className="text-sm" />
            </div>
            {!sidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <div className={`shadow-sm border-b transition-all duration-300 flex-shrink-0 ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <div>
                <h1 className={`text-3xl font-bold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>
                <p className={`mt-1 transition-colors duration-300 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>Welcome back! Here's what's happening today.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              <button className={`relative p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:bg-gray-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}>
                <FaBell className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className={`flex-1 p-6 overflow-hidden transition-colors duration-300 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className="h-full overflow-y-auto scrollbar-hide" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-full max-w-md ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <form onSubmit={addUser} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.fullName}
                onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <input
                type="text"
                placeholder="Company Name"
                value={newUser.companyName}
                onChange={(e) => setNewUser({...newUser, companyName: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add User'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className={`flex-1 py-2 rounded-lg ${
                    darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-full max-w-md ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <form onSubmit={updateUser} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={editUser.fullName}
                onChange={(e) => setEditUser({...editUser, fullName: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <input
                type="text"
                placeholder="Company Name"
                value={editUser.companyName}
                onChange={(e) => setEditUser({...editUser, companyName: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
              <input
                type="email"
                placeholder="Email"
                value={editUser.email}
                onChange={(e) => setEditUser({...editUser, email: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                required
              />
              <select
                value={editUser.role}
                onChange={(e) => setEditUser({...editUser, role: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update User'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditUser(false)}
                  className={`flex-1 py-2 rounded-lg ${
                    darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-lg p-6 w-full max-w-md ${
            darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <h3 className="text-lg font-semibold mb-4 text-red-600">Delete User</h3>
            <p className="mb-6">Are you sure you want to delete <strong>{selectedUser?.fullName}</strong>? This action cannot be undone.</p>
            <div className="flex space-x-3">
              <button
                onClick={deleteUser}
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className={`flex-1 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
              <h3 className="text-2xl font-bold flex items-center">
                <FaBox className="mr-3" />
                Add New Product
              </h3>
              <p className="text-blue-100 mt-1">Create a new product for your store</p>
            </div>
            
            <form onSubmit={addProduct} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Title *</label>
                <input
                  type="text"
                  placeholder="Enter product title"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files)
                      if (files.length === 0) return
                      
                      setNewProduct(prev => ({...prev, images: e.target.files}))
                      
                      Promise.all(
                        files.map(file => {
                          return new Promise(resolve => {
                            const reader = new FileReader()
                            reader.onload = (event) => resolve({
                              url: event.target.result,
                              name: file.name,
                              size: file.size
                            })
                            reader.readAsDataURL(file)
                          })
                        })
                      ).then(previews => {
                        setNewProduct(prev => ({...prev, imagePreview: previews}))
                      })
                    }}
                    className="w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="text-sm text-gray-500">Choose multiple images (JPG, PNG, GIF)</p>
                </div>
                
                {newProduct.imagePreview && newProduct.imagePreview.length > 0 && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-gray-700">Selected Images ({newProduct.imagePreview.length})</p>
                      <button
                        type="button"
                        onClick={() => setNewProduct(prev => ({...prev, images: null, imagePreview: []}))}
                        className="text-xs text-red-600 hover:text-red-800 font-medium"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-40 overflow-y-auto">
                      {newProduct.imagePreview.map((preview, index) => (
                        <div key={index} className="relative group bg-white rounded-lg p-1 shadow-sm">
                          <img 
                            src={preview.url} 
                            alt={preview.name}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newPreviews = newProduct.imagePreview.filter((_, i) => i !== index)
                              const dt = new DataTransfer()
                              Array.from(newProduct.images).forEach((file, i) => {
                                if (i !== index) dt.items.add(file)
                              })
                              setNewProduct(prev => ({
                                ...prev, 
                                imagePreview: newPreviews,
                                images: dt.files.length > 0 ? dt.files : null
                              }))
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b truncate opacity-0 group-hover:opacity-100 transition-opacity">
                            {preview.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
                  <input
                    type="text"
                    placeholder="Cotton, Polyester"
                    value={newProduct.material}
                    onChange={(e) => setNewProduct({...newProduct, material: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">GSM</label>
                  <input
                    type="number"
                    placeholder="180"
                    value={newProduct.gsm}
                    onChange={(e) => setNewProduct({...newProduct, gsm: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Product description..."
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
                    newProduct.status === 'draft' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      value="draft"
                      checked={newProduct.status === 'draft'}
                      onChange={(e) => setNewProduct({...newProduct, status: e.target.value})}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold">Draft</div>
                      <div className="text-xs text-gray-500">Hidden from website</div>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
                    newProduct.status === 'active' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={newProduct.status === 'active'}
                      onChange={(e) => setNewProduct({...newProduct, status: e.target.value})}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-semibold">Active</div>
                      <div className="text-xs text-gray-500">Visible on website</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white flex space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}