import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">KICKSTEP</h3>
            <p className="text-gray-300 mb-4">
              Your trusted partner for premium corporate t-shirts and bulk uniform orders.
            </p>
            <div className="flex space-x-4">
              <FaFacebook className="text-xl hover:text-blue-500 cursor-pointer" />
              <FaTwitter className="text-xl hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="text-xl hover:text-pink-500 cursor-pointer" />
              <FaLinkedin className="text-xl hover:text-blue-600 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/products" className="block text-gray-300 hover:text-white">Products</Link>
              <Link href="/about" className="block text-gray-300 hover:text-white">About Us</Link>
              <Link href="/blog" className="block text-gray-300 hover:text-white">Blog</Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white">Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Bulk Orders</p>
              <p className="text-gray-300">Custom Printing</p>
              <p className="text-gray-300">Embroidery</p>
              <p className="text-gray-300">Corporate Uniforms</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaPhone className="mr-3" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3" />
                <span className="text-gray-300">info@kickstep.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3" />
                <span className="text-gray-300">123 Business St, City, State</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 KICKSTEP. All rights reserved. | 
            <Link href="/privacy" className="hover:text-white ml-2">Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-white ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}