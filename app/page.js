'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FaShieldAlt, FaPalette, FaTruck, FaPercentage, FaStar, FaUsers, FaAward, FaCheckCircle } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-12 sm:py-16 lg:py-20 overflow-hidden animate-gradient-bg">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/10 via-blue-500/10 to-indigo-500/10 animate-wave"></div>
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full animate-float blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full animate-bounce-slow blur-lg"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse blur-2xl"></div>
          <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-float blur-xl"></div>
          <div className="absolute top-60 left-1/2 w-20 h-20 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full animate-bounce blur-lg"></div>
        </div>
        
        {/* Floating Clothing Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-4xl animate-float opacity-30 text-blue-300">👔</div>
          <div className="absolute top-40 right-20 text-3xl animate-bounce-slow opacity-30 text-purple-300">👕</div>
          <div className="absolute bottom-20 left-20 text-2xl animate-pulse opacity-30 text-pink-300">🧵</div>
          <div className="absolute bottom-40 right-10 text-3xl animate-float opacity-30 text-cyan-300">✨</div>
          <div className="absolute top-60 left-1/2 text-2xl animate-bounce opacity-30 text-indigo-300">🎨</div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center bg-white bg-opacity-20 rounded-full px-3 sm:px-4 py-2 mb-4 sm:mb-6 animate-bounce-slow">
                <FaAward className="mr-2 animate-pulse text-sm sm:text-base" />
                <span className="text-xs sm:text-sm font-semibold">👔 Trusted by 500+ Companies</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
                Premium Corporate
                <span className="block text-yellow-400 animate-gradient-text">👕 T-Shirts & Uniforms 🧵</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl mb-6 opacity-90 leading-relaxed">
                🏭 High-quality bulk orders for businesses, schools, and events.<br className="hidden sm:block"/>
                🎨 Custom printing, embroidery & logo branding with unbeatable prices.
                <span className="block mt-2 text-yellow-300 font-semibold text-sm sm:text-base">✨ From Cotton Tees to Executive Polos - We've Got You Covered!</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/contact" className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base lg:text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg text-center">
                  Get Free Quote
                </Link>
                <Link href="/products" className="border-2 border-white text-white hover:bg-white hover:text-primary px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base lg:text-lg font-bold transition-all duration-300 text-center">
                  Browse Products
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start mt-6 space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm animate-slide-in">
                <div className="flex items-center hover:scale-110 transition-transform">
                  <FaCheckCircle className="mr-2 text-green-400 animate-pulse" />
                  <span>🚚 Free Shipping</span>
                </div>
                <div className="flex items-center hover:scale-110 transition-transform">
                  <FaCheckCircle className="mr-2 text-green-400 animate-pulse" />
                  <span>💰 Bulk Discounts</span>
                </div>
                <div className="flex items-center hover:scale-110 transition-transform">
                  <FaCheckCircle className="mr-2 text-green-400 animate-pulse" />
                  <span>⚡ Fast Delivery</span>
                </div>
              </div>
            </div>
            <div className="relative animate-float mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-4 sm:p-6 lg:p-8 backdrop-blur-sm border border-white/20">
                {/* Main Product Showcase */}
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 shadow-2xl">
                    <div className="flex items-center justify-center h-60 sm:h-72 lg:h-80">
                      {/* Center Product Display */}
                      <div className="relative">
                        <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                          <div className="text-center text-white">
                            <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4">👕</div>
                            <div className="text-lg sm:text-xl font-bold">KICKSTEP</div>
                            <div className="text-xs sm:text-sm opacity-90">Corporate Collection</div>
                          </div>
                        </div>
                        
                        {/* Floating Product Icons */}
                        <div className="absolute -top-6 sm:-top-8 -left-6 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
                          <span className="text-lg sm:text-2xl">👔</span>
                        </div>
                        <div className="absolute -top-3 sm:-top-4 -right-8 sm:-right-12 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce-delayed">
                          <span className="text-base sm:text-xl">🧵</span>
                        </div>
                        <div className="absolute -bottom-4 sm:-bottom-6 -left-6 sm:-left-10 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-lg flex items-center justify-center animate-float">
                          <span className="text-base sm:text-xl">✨</span>
                        </div>
                        <div className="absolute -bottom-6 sm:-bottom-8 -right-6 sm:-right-8 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse">
                          <span className="text-lg sm:text-2xl">🎨</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Feature Badges */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    🏆 Premium Quality
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    🌍 Worldwide
                  </div>
                  
                  {/* Bottom Features */}
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md">Cotton</span>
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md">Polyester</span>
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md">Blend</span>
                  </div>
                  
                  <div className="absolute bottom-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    🚀 Fast Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Happy Clients', icon: FaUsers },
              { number: '50K+', label: 'T-Shirts Delivered', icon: FaShieldAlt },
              { number: '98%', label: 'Customer Satisfaction', icon: FaStar },
              { number: '7-14', label: 'Days Delivery', icon: FaTruck }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-primary to-blue-700 text-white p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <stat.icon className="text-3xl mx-auto mb-3" />
                  <div className="text-3xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose KICKSTEP?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">We're not just another t-shirt supplier. We're your partner in creating professional, high-quality corporate apparel.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaShieldAlt, title: 'Premium Quality', desc: 'High-grade fabrics and superior stitching for long-lasting wear', color: 'bg-blue-500' },
              { icon: FaPalette, title: 'Full Customization', desc: 'Logo printing, embroidery, and unlimited color options', color: 'bg-purple-500' },
              { icon: FaTruck, title: 'Fast Delivery', desc: 'Quick 7-14 day turnaround for all bulk orders nationwide', color: 'bg-green-500' },
              { icon: FaPercentage, title: 'Bulk Discounts', desc: 'Up to 40% off for larger quantities with transparent pricing', color: 'bg-orange-500' }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6">
              <span className="text-2xl mr-2">👕</span>
              <span className="text-sm font-semibold text-gray-700">Premium Collection</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our most popular corporate apparel solutions crafted for modern businesses</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, name: 'Premium Cotton T-Shirt', price: '₹299', category: 'Cotton Tees', emoji: '👕', color: 'from-blue-500 to-cyan-500' },
              { id: 2, name: 'Corporate Polo Shirt', price: '₹499', category: 'Polo Shirts', emoji: '👔', color: 'from-purple-500 to-pink-500' },
              { id: 3, name: 'Executive Dress Shirt', price: '₹699', category: 'Dress Shirts', emoji: '🧵', color: 'from-indigo-500 to-blue-500' }
            ].map((product) => (
              <div key={product.id} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/50">
                  {/* Product Image Area */}
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={`https://images.unsplash.com/photo-${product.id === 1 ? '1521572163474-6864f9cf17ab' : product.id === 2 ? '1586790170083-2f9ceadc732d' : '1602810318383-e386cc2a3ccf'}?w=400&h=300&fit=crop`}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-sm font-bold text-gray-800">{product.category}</span>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/30 rounded-full animate-bounce flex items-center justify-center">
                      <span className="text-sm">{product.emoji}</span>
                    </div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                      <div className="text-right">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>{product.price}</div>
                        <div className="text-xs text-gray-500">per piece</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">Premium quality fabric, perfect for corporate uniforms and bulk orders with custom branding options.</p>
                    
                    {/* Features */}
                    <div className="flex items-center space-x-4 mb-6 text-sm">
                      <span className="flex items-center text-green-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Premium Quality
                      </span>
                      <span className="flex items-center text-blue-600">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Custom Print
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Link href={`/products/${product.id}`} className={`flex-1 bg-gradient-to-r ${product.color} text-white py-3 px-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                        View Details
                      </Link>
                      <button className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                        <span className="text-lg">🛒</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12 sm:mt-16">
            <Link href="/products" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <span className="mr-2 sm:mr-3">👀</span>
              <span className="hidden sm:inline">View All Products</span>
              <span className="sm:hidden">View All</span>
              <span className="ml-2 sm:ml-3">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it - hear from our satisfied customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'John Smith', company: 'Tech Corp', review: 'Excellent quality and fast delivery. Our team loves the uniforms! The customization options were perfect for our brand.', rating: 5, avatar: 'JS' },
              { name: 'Sarah Johnson', company: 'Event Solutions', review: 'Perfect for our corporate events. Great customization options and the bulk pricing saved us a lot of money.', rating: 5, avatar: 'SJ' },
              { name: 'Mike Davis', company: 'School District', review: 'Bulk pricing was fantastic. Will definitely order again. The quality exceeded our expectations for the price point.', rating: 5, avatar: 'MD' }
            ].map((testimonial, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{testimonial.review}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-blue-700 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Place Your Bulk Order?</h2>
            <p className="text-xl lg:text-2xl mb-8 opacity-90">Get a custom quote for your corporate uniform needs with unbeatable prices and fast delivery</p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold mb-2">Custom Quotes</h3>
                <p className="text-sm opacity-90">Tailored pricing for your needs</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-bold mb-2">Fast Response</h3>
                <p className="text-sm opacity-90">Quote within 24 hours</p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-bold mb-2">Best Prices</h3>
                <p className="text-sm opacity-90">Guaranteed competitive rates</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get Free Quote Now
              </Link>
              <Link href="/products" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Add custom CSS for animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes bounce-delayed {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-in {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes gradient-text {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
    .animate-bounce-delayed { animation: bounce-delayed 4s ease-in-out infinite 1s; }
    .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
    .animate-slide-in { animation: slide-in 1s ease-out 0.5s both; }
    .animate-gradient-text { 
      background: linear-gradient(-45deg, #fbbf24, #f59e0b, #d97706, #92400e);
      background-size: 400% 400%;
      animation: gradient-text 3s ease infinite;
      -webkit-background-clip: text;
      background-clip: text;
    }
    @keyframes gradient-bg {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes wave {
      0%, 100% { transform: translateX(0) rotate(0deg); }
      50% { transform: translateX(20px) rotate(2deg); }
    }
    .animate-gradient-bg {
      background: linear-gradient(-45deg, #312e81, #7c3aed, #be185d, #1e40af);
      background-size: 400% 400%;
      animation: gradient-bg 8s ease infinite;
    }
    .animate-wave {
      animation: wave 6s ease-in-out infinite;
    }
  `
  document.head.appendChild(style)
}