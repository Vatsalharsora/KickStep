'use client'
import { useState } from 'react'
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      console.log('🔹 Sending login request...')

      const response = await fetch('http://localhost:3003/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password
        })
      })

      const data = await response.json()
      console.log('📦 API Response:', data)
      console.log('📡 HTTP Status:', response.status)
      console.log('👤 User Role:', data.user?.role)

      if (response.ok && data.user && data.user.role === 'admin') {
        // ✅ Admin login success
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminUser', JSON.stringify(data.user))
        console.log('✅ Admin authenticated successfully! Redirecting...')
        window.location.href = '/admin-portal-2024/dashboard'
      } 
      else if (response.ok && data.user && data.user.role !== 'admin') {
        // ❌ Role not admin
        setError('Access denied. Admin privileges required.')
      } 
      else {
        // ❌ API returned error (invalid credentials, etc.)
        console.error('❌ Login failed:', data)
        setError(data.message || 'Invalid credentials. Please try again.')
      }
    } catch (error) {
      console.error('🚨 Connection error:', error)
      setError('Connection error. Please check server connection.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        <div className="flex flex-col md:flex-row">
          
          {/* Left Panel */}
          <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, white 2px, transparent 2px),
                  linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)
                `,
                backgroundSize: '40px 40px, 40px 40px, 80px 80px'
              }}></div>
            </div>

            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute top-32 right-16 w-16 h-16 bg-white bg-opacity-5 rounded-lg rotate-45 animate-spin" style={{animationDuration: '10s'}}></div>
              <div className="absolute bottom-20 left-20 w-12 h-12 bg-white bg-opacity-15 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-32 right-8 w-24 h-24 bg-white bg-opacity-5 rounded-lg rotate-12 animate-ping" style={{animationDuration: '3s'}}></div>
            </div>

            <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 h-64 md:h-full">
              <div className="bg-white rounded-2xl px-4 py-2 mb-6 shadow-2xl animate-bounce" style={{animationDuration: '2s'}}>
                <img src="/kickStepLogo.svg" alt="KickStep Logo" className="w-24 h-24 animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold mb-2 animate-fade-in">Admin Dashboard</h1>
              <p className="text-center opacity-90 text-sm animate-fade-in">Manage products, orders, customers & analytics</p>
              <p className="text-center opacity-75 text-xs mt-1 animate-fade-in">Secure dashboard for business operations</p>
              <div className="mt-6 flex space-x-2">
                <div className="w-8 h-0.5 bg-white bg-opacity-60 animate-pulse"></div>
                <div className="w-4 h-0.5 bg-white bg-opacity-40 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-6 h-0.5 bg-white bg-opacity-60 animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>

          {/* Right Panel (Form) */}
          <div className="md:w-1/2 p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Admin Login</h2>
              <p className="text-gray-600 text-sm">Enter your credentials to access dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Username / Email */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Username / Email
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter username or email"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FaLock className="mr-2" />
                    Login
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
