'use client'
import { useState } from 'react'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPhone } from 'react-icons/fa'

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
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Enter your name'
    if (!formData.email.trim()) {
      newErrors.email = 'Enter your email address'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Enter your phone number'
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid phone number'
    }
    if (!formData.product) newErrors.product = 'Select a product type'
    if (!formData.quantity || formData.quantity < 1) newErrors.quantity = 'Enter quantity (minimum 1)'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setSubmitMessage('Please fix the errors below')
      return
    }
    
    setIsSubmitting(true)
    setSubmitMessage('')
    
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setSubmitMessage('Quote request sent successfully! We\'ll contact you within 24 hours.')
        setFormData({ name: '', email: '', phone: '', company: '', product: '', quantity: '', message: '' })
        setErrors({})
      } else {
        setSubmitMessage('Failed to send request. Please try again.')
      }
    } catch (error) {
      setSubmitMessage('Error sending request. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center bg-white/20 rounded-full px-6 py-2 mb-6 animate-bounce">
            <FaPhone className="text-xl mr-2" style={{transform: 'scaleX(-1)'}} />
            <span className="text-sm font-semibold">Get In Touch</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl lg:text-2xl opacity-90">Get in touch for bulk orders and custom solutions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => window.open('tel:+919558281589')}>
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-all duration-300 animate-pulse hover:animate-none">
                  <FaPhoneAlt className="text-primary text-xl hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p className="text-gray-600">Mon-Fri 9AM-6PM</p>
                </div>
              </div>
              <p className="text-primary font-semibold text-lg hover:underline">+91 9558281589</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => window.open('https://wa.me/919558281589?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20your%20corporate%20t-shirts%20and%20bulk%20orders.', '_blank')}>
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition-all duration-300 animate-bounce hover:animate-none">
                  <FaWhatsapp className="text-green-500 text-xl hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">WhatsApp</h3>
                  <p className="text-gray-600">Quick Response</p>
                </div>
              </div>
              <p className="text-green-600 font-semibold text-lg hover:underline">+91 9558281589</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => window.open('mailto:finethreadindia@gmail.com?subject=Inquiry%20about%20Corporate%20T-Shirts&body=Hello%2C%0A%0AI%20would%20like%20to%20inquire%20about%20your%20corporate%20t-shirts%20and%20bulk%20orders.%0A%0APlease%20provide%20me%20with%20more%20information.%0A%0AThank%20you.')}>
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full hover:bg-red-200 transition-all duration-300 animate-pulse hover:animate-none">
                  <FaEnvelope className="text-red-500 text-xl hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-gray-600">24/7 Support</p>
                </div>
              </div>
              <p className="text-red-600 font-semibold hover:underline">finethreadindia@gmail.com</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-start mb-4">
                <div className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition-all duration-300 animate-ping hover:animate-none">
                  <FaMapMarkerAlt className="text-purple-500 text-xl hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-lg">Visit Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mt-2">
                    Fine Thread India<br />
                    39-40, 1st Floor, Ashwabhumi Estate,<br />
                    Behind Memco Bridge, Naroda Road,<br />
                    Ahmedabad – 382345, Gujarat, India
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Request Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Request a Quote</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                        errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="e.g. John Smith"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                        errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="e.g. john@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                        errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="e.g. +91 9876543210"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g. ABC Corporation (optional)"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Type *</label>
                    <select
                      name="product"
                      required
                      value={formData.product}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                        errors.product ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    >
                      <option value="">Select Product Type</option>
                      <option value="Cotton T-Shirts">Cotton T-Shirts</option>
                      <option value="Polo Shirts">Polo Shirts</option>
                      <option value="Dress Shirts">Dress Shirts</option>
                      <option value="Sports Jerseys">Sports Jerseys</option>
                      <option value="Uniforms">Uniforms</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.product && <p className="text-red-500 text-sm mt-1">{errors.product}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      required
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                        errors.quantity ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="e.g. 100 pieces"
                    />
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="e.g. Sizes: S(10), M(20), L(15), XL(5)&#10;Colors: Navy blue, white&#10;Logo: Company logo on front&#10;Delivery: Within 2 weeks"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base lg:text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending Request...
                    </span>
                  ) : (
                    'Send Quote Request'
                  )}
                </button>
                
                {submitMessage && (
                  <div className={`p-4 rounded-lg border ${submitMessage.includes('successfully') ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    <div className="flex items-center">
                      {submitMessage.includes('successfully') ? (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                      {submitMessage}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
      </div>
        
        {/* Map Section */}
        <div className="lg:col-span-3 mt-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Our Location</h2>
              <p className="text-gray-600">Visit our showroom to see our products in person</p>
            </div>
            <div className="w-full h-96 rounded-xl overflow-hidden shadow-inner">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.234567890123!2d72.6234567!3d23.0234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f2c9b1234%3A0x1234567890abcdef!2sNaroda%20Road%2C%20Ahmedabad%2C%20Gujarat%20382345!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fine Thread India Location - Naroda Road, Ahmedabad"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}