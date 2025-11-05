'use client'
import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: '',
    quantity: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setSubmitMessage('Quote request sent successfully! We\'ll contact you within 24 hours.')
        setFormData({ name: '', email: '', phone: '', company: '', product: '', quantity: '', message: '' })
      } else {
        setSubmitMessage('Failed to send request. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('Error sending request. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Ready to place a bulk order or have questions about our products? 
            Contact us today for a personalized quote.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center">
              <FaPhone className="text-primary text-xl mr-4" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+91 9558281589</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <FaEnvelope className="text-primary text-xl mr-4" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">finethreadindia@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-primary text-xl mr-4" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">FINE THREAD INDIA  <br /> 39-40, 1ST FLOOR, ASHWBHUMI ESTATE, <br />B/H MEMCO BRIDGE, NARODA ROAD <br /> AHMEDABAD- 382345
</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <FaWhatsapp className="text-green-500 text-xl mr-4" />
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-gray-600">+91 9558281589</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-primary text-white rounded-lg">
            <h3 className="text-xl font-bold mb-2">Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        {/* Quote Request Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Request a Quote</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <select
                name="product"
                required
                value={formData.product}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Product Type *</option>
                <option value="Cotton T-Shirts">Cotton T-Shirts</option>
                <option value="Polo Shirts">Polo Shirts</option>
                <option value="Dress Shirts">Dress Shirts</option>
                <option value="Sports Jerseys">Sports Jerseys</option>
                <option value="Uniforms">Uniforms</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity *"
                required
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <textarea
              name="message"
              placeholder="Additional details (sizes, colors, customization requirements, etc.)"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Request Quote'}
            </button>
            
            {submitMessage && (
              <div className={`p-4 rounded-lg ${submitMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}