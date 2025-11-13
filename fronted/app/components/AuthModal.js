'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaGlobe } from 'react-icons/fa'

export default function AuthModal({ isOpen, onClose, initialMode = 'signup' }) {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    agreedToTerms: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showWelcome, setShowWelcome] = useState(false)

  const countries = [
    '🇮🇳 India', '🇺🇸 United States', '🇬🇧 United Kingdom', '🇨🇦 Canada', '🇦🇺 Australia', 
    '🇩🇪 Germany', '🇫🇷 France', '🇯🇵 Japan', '🇨🇳 China', '🇧🇷 Brazil', '🇲🇽 Mexico', 
    '🇮🇹 Italy', '🇪🇸 Spain', '🇳🇱 Netherlands', '🇸🇪 Sweden', '🇳🇴 Norway', '🇩🇰 Denmark', 
    '🇨🇭 Switzerland', '🇷🇺 Russia', '🇰🇷 South Korea', '🇸🇬 Singapore', '🇦🇪 UAE'
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-blur')
      setMode('login')
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        companyName: '',
        agreedToTerms: false
      })
      setError('')
      setSuccess('')
    } else if (!showWelcome) {
      document.body.classList.remove('modal-blur')
    }
    return () => {
      if (!showWelcome) {
        document.body.classList.remove('modal-blur')
      }
    }
  }, [isOpen, showWelcome])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      if (mode === 'signup') {
        const response = await fetch('http://localhost:3003/api/users/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            companyName: formData.companyName,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            agreedToTerms: formData.agreedToTerms
          })
        })
        
        const data = await response.json()
        
        if (data.status === 'success') {
          setSuccess('🎉 Account created successfully!')
          setTimeout(() => {
            setSuccess('')
            onClose()
          }, 2000)
        } else {
          setError(data.message)
          setTimeout(() => setError(''), 3000)
        }
      } else {
        const response = await fetch('http://localhost:3003/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        })
        
        const data = await response.json()
        
        if (data.token) {
          localStorage.setItem('token', data.token)
          setSuccess('🚀 Login successful!')
          setTimeout(() => {
            setSuccess('')
            onClose()
            setShowWelcome(true)
            setTimeout(() => {
              setShowWelcome(false)
              document.body.classList.remove('modal-blur')
            }, 3000)
          }, 2000)
        } else {
          setError(data.mess || 'Login failed')
          setTimeout(() => setError(''), 3000)
        }
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen && !showWelcome) return null

  if (showWelcome) {
    return createPortal(
      <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
        <div className="relative">
          {/* Floating particles */}
          <div className="absolute -top-10 -left-10 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute -top-5 -right-8 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute -bottom-8 -left-6 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute -bottom-5 -right-10 w-5 h-5 bg-green-400 rounded-full animate-spin"></div>
          
          {/* Main card */}
          <div className="bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 p-1 rounded-3xl shadow-2xl transform animate-pulse">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center">
              {/* Animated emoji */}
              <div className="relative mb-6">
                <div className="text-8xl animate-bounce">🎉</div>
                <div className="absolute -top-2 -right-2 text-3xl animate-spin">✨</div>
                <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">🚀</div>
              </div>
              
              {/* Welcome text with typewriter effect */}
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
                  Welcome Back!
                </h2>
                <p className="text-xl mb-4 text-white/90 animate-fade-in">
                  🎆 You're successfully logged in 🎆
                </p>
                <div className="flex justify-center space-x-2 text-2xl">
                  <span className="animate-bounce">🚀</span>
                  <span className="animate-bounce delay-100">🌟</span>
                  <span className="animate-bounce delay-200">🎉</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Orbiting elements */}
          <div className="absolute inset-0 animate-spin" style={{animationDuration: '10s'}}>
            <div className="absolute -top-12 left-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-1/2 -right-12 w-2 h-2 bg-pink-400 rounded-full"></div>
            <div className="absolute -bottom-12 left-1/2 w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute top-1/2 -left-12 w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
        `}</style>
      </div>,
      document.body
    )
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000]" data-portal>
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <div className="relative h-screen flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-sm transform transition-all">
          <div className="relative p-4">
            <button onClick={onClose} className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full text-white">
              <FaTimes size={14} />
            </button>
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                  <FaGlobe size={20} className="text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white">
                {mode === 'login' ? '🎉 Welcome Back!' : '🚀 Start Your Journey'}
              </h2>
              <p className="text-xs text-white/80 mt-1">
                {mode === 'login' 
                  ? 'Sign in to access your account' 
                  : 'Create account to get started'
                }
              </p>
            </div>
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-3 py-2 rounded-lg text-xs mb-3">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500/20 border border-green-500/30 text-green-200 px-3 py-2 rounded-lg text-xs mb-3">
                {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-2">
              {mode === 'signup' && (
                <>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="👤 Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-2 py-1.5 text-xs bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:border-white/50 focus:outline-none text-white placeholder-white/70"
                    required
                  />
                  
                  <input
                    type="text"
                    name="companyName"
                    placeholder="🏢 Company Name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="w-full px-2 py-1.5 text-xs bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:border-white/50 focus:outline-none text-white placeholder-white/70"
                    required
                  />
                </>
              )}

              <input
                type="email"
                name="email"
                placeholder="📧 Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-2 py-1.5 text-xs bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:border-white/50 focus:outline-none text-white placeholder-white/70"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="🔒 Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-2 py-1.5 pr-8 text-xs bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:border-white/50 focus:outline-none text-white placeholder-white/70"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                </button>
              </div>

              {mode === 'signup' && (
                <>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="🔒 Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="w-full px-2 py-1.5 pr-8 text-xs bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:border-white/50 focus:outline-none text-white placeholder-white/70"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                    >
                      {showConfirmPassword ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                    </button>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onChange={(e) => setFormData({...formData, agreedToTerms: e.target.checked})}
                      className="w-3 h-3 mt-0.5 accent-blue-500 bg-white/10 border border-white/30 rounded"
                      required
                    />
                    <label htmlFor="agreedToTerms" className="text-xs text-white/80 leading-tight">
                      I agree to the Terms and Conditions and Conditions
                    </label>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-1.5 rounded-lg font-semibold text-xs hover:bg-white/30 transition-all disabled:opacity-50"
              >
                {loading ? '⏳ Please wait...' : (mode === 'login' ? '🚀 Sign In' : '🌟 Create Account')}
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 text-white/70">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button type="button" className="flex items-center justify-center py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 text-xs text-white">
                  <FaGoogle className="mr-1 text-red-400" size={12} />
                  Google
                </button>
                <button type="button" className="flex items-center justify-center py-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 text-xs text-white">
                  <FaFacebook className="mr-1 text-blue-400" size={12} />
                  Facebook
                </button>
              </div>
            </form>

            <div className="text-center mt-3 pt-2 border-t border-white/20">
              <span className="text-xs text-white/70">
                {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-xs text-white font-semibold hover:underline"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}