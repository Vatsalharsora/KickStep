'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaShieldAlt, FaPalette, FaTruck, FaPercentage } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Your Partner in Premium Corporate T-Shirts
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            High-quality uniforms and bulk t-shirt orders for businesses, schools, and events. 
            Custom printing and embroidery available.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/products" className="bg-secondary hover:bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors mr-4">
              Get Bulk Quote
            </Link>
            <Link href="/products" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              View Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose KICKSTEP?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FaShieldAlt, title: 'Premium Quality', desc: 'High-grade fabrics and superior stitching' },
              { icon: FaPalette, title: 'Full Customization', desc: 'Logo printing, embroidery, and color options' },
              { icon: FaTruck, title: 'Fast Delivery', desc: 'Quick turnaround for bulk orders' },
              { icon: FaPercentage, title: 'Bulk Discounts', desc: 'Better prices for larger quantities' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-lg"
              >
                <item.icon className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <Image 
                  src={`https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop`}
                  alt="T-shirt"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Corporate T-Shirt #{item}</h3>
                  <p className="text-gray-600 mb-4">Premium cotton blend, perfect for corporate uniforms</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">$12.99</span>
                    <Link href={`/products/${item}`} className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700">
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'John Smith', company: 'Tech Corp', review: 'Excellent quality and fast delivery. Our team loves the uniforms!' },
              { name: 'Sarah Johnson', company: 'Event Solutions', review: 'Perfect for our corporate events. Great customization options.' },
              { name: 'Mike Davis', company: 'School District', review: 'Bulk pricing was fantastic. Will definitely order again.' }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.company}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Place Your Bulk Order?</h2>
          <p className="text-xl mb-8">Get a custom quote for your corporate uniform needs</p>
          <Link href="/products" className="bg-secondary hover:bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Request Quote Now
          </Link>
        </div>
      </section>
    </div>
  )
}