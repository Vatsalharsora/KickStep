import Image from 'next/image'
import { FaAward, FaUsers, FaTruck, FaLeaf } from 'react-icons/fa'

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About KICKSTEP</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Leading manufacturer of premium corporate t-shirts and uniforms, 
            serving businesses worldwide with quality, customization, and reliability.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FaAward, title: 'Quality First', desc: 'Premium materials and superior craftsmanship in every product' },
              { icon: FaUsers, title: 'Customer Focus', desc: 'Dedicated support and personalized service for every client' },
              { icon: FaTruck, title: 'Reliable Delivery', desc: 'On-time delivery and efficient logistics for all orders' },
              { icon: FaLeaf, title: 'Sustainability', desc: 'Eco-friendly practices and sustainable manufacturing processes' }
            ].map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-lg">
                <value.icon className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
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
          <a href="/contact" className="bg-secondary hover:bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Get Your Quote Today
          </a>
        </div>
      </section>
    </div>
  )
}