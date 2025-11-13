'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars, FaTimes, FaShoppingBag, FaUser, FaGlobe, FaPhone, FaWhatsapp, FaSearch, FaHome, FaInfoCircle, FaBlog, FaEnvelope, FaHeadset } from 'react-icons/fa'
import AuthModal from './AuthModal'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const count = cart.length
      setCartCount(count)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    updateCartCount()
    window.addEventListener('cartUpdated', updateCartCount)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className={`fixed top-0 left-0 right-0 z-[9999] transition-transform duration-300 ${
      isScrolled ? 'translate-y-0' : 'translate-y-0'
    }`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-2 px-4 text-xs sm:text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-6">
            <span className="flex items-center">
              <FaGlobe className="mr-1 sm:mr-2 text-blue-300 text-xs sm:text-sm" />
              <span className="hidden sm:inline">Worldwide Shipping Available</span>
              <span className="sm:hidden">Worldwide</span>
            </span>
            <span className="hidden md:flex items-center">
              <FaHeadset className="mr-2 text-green-300" />
              24/7 Support: +91 9558281589
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href="https://wa.me/919558281589" className="flex items-center hover:text-green-300 transition-colors">
              <FaWhatsapp className="mr-1 text-xs sm:text-sm" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <span className="text-blue-300 text-xs sm:text-sm">🇮🇳 India</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-2xl border-b border-blue-100' 
          : 'bg-white/90 backdrop-blur-sm shadow-lg'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Image 
                  src="/kickStepLogo.svg" 
                  alt="KICKSTEP" 
                  width={120} 
                  height={40} 
                  className="h-8 sm:h-10 w-auto"
                  priority
                />
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
              {[
                { name: 'Home', href: '/', icon: 'FaHome' },
                { name: 'Products', href: '/products', icon: 'FaShoppingBag' },
                { name: 'About', href: '/about', icon: 'FaInfoCircle' },
                { name: 'Blog', href: '/blog', icon: 'FaBlog' },
                { name: 'Contact', href: '/contact', icon: 'FaEnvelope' }
              ].map((item, index) => (
                <Link 
                  key={index}
                  href={item.href} 
                  className="group relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium"
                >
                  <span className="flex items-center">
                    <span className="mr-2 group-hover:scale-110 transition-transform" style={{transform: 'scaleX(1)'}}>
                      {item.icon === 'FaHome' && <FaHome />}
                      {item.icon === 'FaShoppingBag' && <FaShoppingBag />}
                      {item.icon === 'FaInfoCircle' && <FaInfoCircle />}
                      {item.icon === 'FaBlog' && <FaBlog />}
                      {item.icon === 'FaEnvelope' && <FaEnvelope />}
                    </span>
                    {item.name}
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            {/* Search Bar & Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
              {showSearch ? (
                <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-32"
                    autoFocus
                    onBlur={() => !searchQuery && setShowSearch(false)}
                  />
                  <button type="submit" className="text-blue-600 hover:text-blue-800 ml-2">
                    <FaSearch />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                >
                  <FaSearch />
                </button>
              )}
              
              <Link href="/cart" className="group relative p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                <FaShoppingBag className="text-xl group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <button onClick={() => setShowAuthModal(true)} className="group p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                <FaUser className="text-xl group-hover:scale-110 transition-transform" />
              </button>
              
              <Link href="/contact" className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
                <span className="flex items-center">
                  <FaPhone className="mr-2" style={{transform: 'scaleX(-1)'}} />
                  Get Quote
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mt-4 border border-blue-100">
              {/* Sticky Mobile Search */}
              <div className="sticky top-0 bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 pb-2 rounded-t-2xl">
                <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
                  <FaSearch className="text-gray-400 mr-2 sm:mr-3 text-sm" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 outline-none text-gray-700 placeholder-gray-500 text-sm"
                  />
                </form>
              </div>
              
              {/* Scrollable Menu Content */}
              <div className="max-h-64 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="space-y-2 sm:space-y-3">
                {[
                  { name: 'Home', href: '/', icon: 'FaHome' },
                  { name: 'Products', href: '/products', icon: 'FaShoppingBag' },
                  { name: 'About', href: '/about', icon: 'FaInfoCircle' },
                  { name: 'Blog', href: '/blog', icon: 'FaBlog' },
                  { name: 'Contact', href: '/contact', icon: 'FaEnvelope' }
                ].map((item, index) => (
                  <Link 
                    key={index}
                    href={item.href} 
                    className="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-xl transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg mr-3">
                      {item.icon === 'FaHome' && <FaHome />}
                      {item.icon === 'FaShoppingBag' && <FaShoppingBag />}
                      {item.icon === 'FaInfoCircle' && <FaInfoCircle />}
                      {item.icon === 'FaBlog' && <FaBlog />}
                      {item.icon === 'FaEnvelope' && <FaEnvelope />}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                
                <div className="border-t border-blue-200 pt-4 mt-4">
                  <Link 
                    href="/cart" 
                    className="flex items-center justify-between p-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-xl transition-all mb-3"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaShoppingBag className="mr-3" />
                      <span className="font-medium">Cart</span>
                    </div>
                    {cartCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  
                  <button 
                    onClick={() => { setShowAuthModal(true); setIsOpen(false); }}
                    className="flex items-center p-3 text-gray-700 hover:text-blue-600 hover:bg-white rounded-xl transition-all mb-4 w-full"
                  >
                    <FaUser className="mr-3" />
                    <span className="font-medium">Login</span>
                  </button>
                  
                  <Link 
                    href="/contact" 
                    className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    💬 Get Quote Now
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode="login" 
      />
    </div>
  )
}