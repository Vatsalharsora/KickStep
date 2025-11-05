'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaBars, FaTimes, FaShoppingCart, FaUser } from 'react-icons/fa'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image src="/kickStepLogo.svg" alt="KICKSTEP" width={120} height={40} className="h-10 w-auto" />
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-primary transition-colors">Products</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">About</Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary transition-colors">Blog</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">Contact</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-primary">
              <FaShoppingCart className="text-xl" />
            </Link>
            <Link href="/auth/login" className="text-gray-700 hover:text-primary">
              <FaUser className="text-xl" />
            </Link>
            <Link href="/products" className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-primary">Products</Link>
              <Link href="/about" className="text-gray-700 hover:text-primary">About</Link>
              <Link href="/blog" className="text-gray-700 hover:text-primary">Blog</Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
              <Link href="/cart" className="text-gray-700 hover:text-primary">Cart</Link>
              <Link href="/auth/login" className="text-gray-700 hover:text-primary">Login</Link>
              <Link href="/products" className="bg-primary text-white px-4 py-2 rounded text-center">
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}