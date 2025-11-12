'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaArrowUp, FaHeart, FaGlobe, FaShippingFast, FaAward, FaClock, FaTiktok, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  const [email, setEmail] = useState('')
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className="relative bg-gradient-to-br from-blue-50 via-white to-gray-100 text-gray-800 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full blur-2xl animate-ping"></div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-float"></div>
      </div>
      
      <div className="relative z-10">
        {/* Top Wave */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="rgba(59,130,246,0.1)"></path>
          </svg>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-12 sm:pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="group mb-6">
                <div className="mb-6">
                  <Image 
                    src="/kickStepLogo.svg" 
                    alt="KICKSTEP - Global Corporate Apparel" 
                    width={180} 
                    height={60} 
                    className="h-16 w-auto group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Elevating corporate identity worldwide through premium t-shirts and uniforms. 
                Trusted by 500+ companies across 25+ countries.
              </p>
              
              {/* Global Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-blue-50 backdrop-blur-sm p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center mb-1 sm:mb-2">
                    <FaGlobe className="text-blue-600 mr-1 sm:mr-2 text-sm" />
                    <span className="text-lg sm:text-2xl font-bold text-gray-800">25+</span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">Countries Served</p>
                </div>
                <div className="bg-purple-50 backdrop-blur-sm p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center mb-1 sm:mb-2">
                    <FaAward className="text-purple-600 mr-1 sm:mr-2 text-sm" />
                    <span className="text-lg sm:text-2xl font-bold text-gray-800">500+</span>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">Happy Clients</p>
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-blue-200">
                <h4 className="font-bold mb-2 sm:mb-3 text-lg sm:text-xl flex items-center text-gray-800">
                  <span className="mr-2">🌍</span> Global Updates
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Join 10,000+ subscribers worldwide</p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-300 rounded-xl sm:rounded-l-xl sm:rounded-r-none focus:outline-none focus:border-blue-400 text-gray-800 placeholder-gray-500 text-sm"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-r-xl sm:rounded-l-none hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold transform hover:scale-105 text-white text-sm"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mr-2 sm:mr-3"></span>
                Quick Links
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: 'Products', href: '/products', icon: '🛍️' },
                  { name: 'About Us', href: '/about', icon: '🏢' },
                  { name: 'Blog', href: '/blog', icon: '📝' },
                  { name: 'Contact', href: '/contact', icon: '📞' },
                  { name: 'Bulk Orders', href: '/contact', icon: '📦' },
                  { name: 'Size Guide', href: '/size-guide', icon: '📏' }
                ].map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href} 
                    className="group flex items-center text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2"
                  >
                    <span className="mr-3 group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="group-hover:font-medium">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center">
                <span className="w-1 h-4 sm:h-6 bg-gradient-to-b from-purple-400 to-indigo-400 rounded-full mr-2 sm:mr-3"></span>
                Services
              </h4>
              <div className="space-y-2 sm:space-y-4">
                {[
                  { name: 'Bulk T-Shirt Orders', icon: '👕' },
                  { name: 'Custom Logo Printing', icon: '🎨' },
                  { name: 'Embroidery Services', icon: '🧵' },
                  { name: 'Corporate Uniforms', icon: '👔' },
                  { name: 'Event Merchandise', icon: '🎪' },
                  { name: 'Global Shipping', icon: '🌍' }
                ].map((service, index) => (
                  <div key={index} className="group flex items-center text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                    <span className="text-lg mr-3 group-hover:scale-110 transition-transform">{service.icon}</span>
                    <span className="group-hover:font-medium">{service.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-indigo-400 to-blue-400 rounded-full mr-3"></span>
                Contact
              </h4>
              <div className="space-y-5">
                <div className="group flex items-start">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl mr-4 mt-1 group-hover:scale-110 transition-transform">
                    <FaPhone className="text-sm text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">24/7 Support</p>
                    <a href="tel:+919558281589" className="text-gray-800 hover:text-blue-600 transition-colors font-medium">
                      +91 9558281589
                    </a>
                  </div>
                </div>
                
                <div className="group flex items-start">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl mr-4 mt-1 group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-sm text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Email Us</p>
                    <a href="mailto:finethreadindia@gmail.com" className="text-gray-800 hover:text-blue-600 transition-colors font-medium break-all">
                      finethreadindia@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="group flex items-start">
                  <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-xl mr-4 mt-1 group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt className="text-sm text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Headquarters</p>
                    <address className="text-gray-800 not-italic leading-relaxed">
                      Fine Thread India<br />
                      Ahmedabad, Gujarat<br />
                      India 🇮🇳
                    </address>
                  </div>
                </div>
              </div>
            </div>

            {/* Social & Features */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-pink-400 to-red-400 rounded-full mr-3"></span>
                Connect
              </h4>
              
              {/* Social Media */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: FaFacebook, color: 'from-blue-600 to-blue-700', link: '#' },
                  { icon: FaInstagram, color: 'from-pink-500 to-rose-500', link: '#' },
                  { icon: FaLinkedin, color: 'from-blue-700 to-blue-800', link: '#' },
                  { icon: FaTwitter, color: 'from-sky-400 to-blue-500', link: '#' },
                  { icon: FaYoutube, color: 'from-red-500 to-red-600', link: '#' },
                  { icon: FaWhatsapp, color: 'from-green-500 to-green-600', link: 'https://wa.me/919558281589' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.link}
                    className={`group bg-gradient-to-r ${social.color} p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl flex items-center justify-center`}
                  >
                    <social.icon className="text-lg group-hover:animate-bounce text-white" />
                  </a>
                ))}
              </div>
              
              {/* Features */}
              <div className="space-y-3">
                {[
                  { icon: FaShippingFast, text: 'Fast Delivery', color: 'text-green-600' },
                  { icon: FaAward, text: 'Quality Assured', color: 'text-yellow-600' },
                  { icon: FaClock, text: '24/7 Support', color: 'text-blue-600' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <feature.icon className={`${feature.color} mr-3 text-lg`} />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 bg-gradient-to-r from-slate-900 to-blue-900 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 sm:space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <p className="text-white flex items-center text-xs sm:text-sm text-center lg:text-left">
                  © 2024 KICKSTEP. Crafted with 
                  <FaHeart className="text-red-500 mx-1 sm:mx-2 animate-pulse" /> 
                  for global excellence.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start space-x-2 sm:space-x-4 text-xs text-blue-300">
                  <span className="flex items-center">
                    <FaGlobe className="mr-1 text-blue-300" /> Worldwide
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">ISO Certified</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">Eco-Friendly</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex space-x-4 text-sm">
                  <Link href="/privacy" className="text-blue-300 hover:text-white transition-colors hover:underline">
                    Privacy
                  </Link>
                  <Link href="/terms" className="text-blue-300 hover:text-white transition-colors hover:underline">
                    Terms
                  </Link>
                  <Link href="/sitemap" className="text-blue-300 hover:text-white transition-colors hover:underline">
                    Sitemap
                  </Link>
                </div>
                <button 
                  onClick={scrollToTop}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
                >
                  <FaArrowUp className="text-sm group-hover:animate-bounce text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </footer>
  )
}