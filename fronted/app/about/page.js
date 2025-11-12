import Image from 'next/image'
import { FaAward, FaUsers, FaTruck, FaLeaf, FaInfoCircle, FaPhone } from 'react-icons/fa'

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center bg-white/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6 animate-bounce">
            <FaInfoCircle className="text-lg sm:text-xl mr-2" />
            <span className="text-xs sm:text-sm font-semibold">About Our Company</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">About KICKSTEP</h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed">
            Leading manufacturer of premium corporate t-shirts and uniforms, 
            serving businesses worldwide with quality, customization, and reliability.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2015, KICKSTEP began with a simple mission: to provide businesses 
                with high-quality, affordable corporate apparel that represents their brand with pride.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small operation has grown into a trusted partner for thousands 
                of companies, schools, and organizations across the country. We specialize in 
                bulk orders, custom printing, and embroidery services.
              </p>
              <p className="text-gray-600">
                Today, we're proud to be the go-to choice for businesses looking for premium 
                corporate uniforms that combine style, comfort, and durability.
              </p>
            </div>
            <div>
              <Image 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
                alt="KICKSTEP factory"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: FaAward, title: 'Quality First', desc: 'Premium materials and superior craftsmanship in every product' },
              { icon: FaUsers, title: 'Customer Focus', desc: 'Dedicated support and personalized service for every client' },
              { icon: FaTruck, title: 'Reliable Delivery', desc: 'On-time delivery and efficient logistics for all orders' },
              { icon: FaLeaf, title: 'Sustainability', desc: 'Eco-friendly practices and sustainable manufacturing processes' }
            ].map((value, index) => (
              <div key={index} className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/50">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <value.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10,000+', label: 'Happy Customers' },
              { number: '500,000+', label: 'Products Delivered' },
              { number: '50+', label: 'Cities Served' },
              { number: '99%', label: 'Customer Satisfaction' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'John Smith', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop' },
              { name: 'Sarah Johnson', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop' },
              { name: 'Mike Davis', role: 'Quality Manager', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' }
            ].map((member, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-lg">
                <Image 
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl mb-8">Join thousands of satisfied customers who trust KICKSTEP for their corporate apparel needs</p>
          <a href="/contact" className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            <FaPhone className="mr-3" style={{transform: 'scaleX(-1)'}} />
            Get Your Quote Today
            <span className="ml-3">→</span>
          </a>
        </div>
      </section>
    </div>
  )
}