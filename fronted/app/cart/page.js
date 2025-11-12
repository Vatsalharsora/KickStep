'use client'
import { useState, useEffect } from 'react'
import { FaTrash, FaPlus, FaMinus, FaShoppingCart, FaWhatsapp, FaShoppingBag } from 'react-icons/fa'
import Link from 'next/link'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const [deleteMessage, setDeleteMessage] = useState('')

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(savedCart)
  }, [])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedItems)
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedItems))
  }

  const removeItem = (id) => {
    const itemName = cartItems.find(item => item.id === id)?.name
    const updatedItems = cartItems.filter(item => item.id !== id)
    setCartItems(updatedItems)
    
    // Update localStorage and trigger cart count update
    localStorage.setItem('cart', JSON.stringify(updatedItems))
    window.dispatchEvent(new Event('cartUpdated'))
    
    setDeleteMessage(`${itemName} deleted successfully!`)
    setTimeout(() => setDeleteMessage(''), 3000)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 1000 ? 0 : 50
  const total = subtotal + shipping

  const handleWhatsAppOrder = () => {
    const orderDetails = cartItems.map(item => 
      `${item.name} - Size: ${item.size}, Color: ${item.color}, Qty: ${item.quantity}, Price: ₹${item.price * item.quantity}`
    ).join('\n')
    
    const message = `Hello! I would like to place an order:\n\n${orderDetails}\n\nSubtotal: ₹${subtotal}\nShipping: ₹${shipping}\nTotal: ₹${total}\n\nPlease confirm availability and delivery details.`
    
    window.open(`https://wa.me/919558281589?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 max-w-md mx-auto">
            <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started</p>
            <Link href="/products" className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <FaShoppingBag className="mr-3" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">Shopping Cart</h1>
        
        {deleteMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-700">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {deleteMessage}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
              </div>
              
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg bg-gray-200"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <div className="text-sm text-gray-600 mt-1">
                          <span>Size: {item.size}</span> • <span>Color: {item.color}</span>
                        </div>
                        <div className="text-lg font-bold text-primary mt-2">₹{item.price}</div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-lg">₹{item.price * item.quantity}</div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 mt-2 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                
                {shipping === 0 && (
                  <div className="text-sm text-green-600">
                    🎉 Free shipping on orders over ₹1000
                  </div>
                )}
                
                <hr />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
              
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105 text-sm sm:text-base"
                >
                  <FaWhatsapp className="text-sm sm:text-base lg:text-lg" />
                  <span>Order via WhatsApp</span>
                </button>
                
                <Link 
                  href="/contact"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 block text-center shadow-lg transform hover:scale-105 text-sm sm:text-base"
                >
                  Request Custom Quote
                </Link>
                
                <Link 
                  href="/products"
                  className="w-full border-2 border-gray-300 text-gray-700 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-50 hover:border-blue-300 transition-all duration-300 block text-center transform hover:scale-105 text-sm sm:text-base"
                >
                  Continue Shopping
                </Link>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Bulk Order Benefits</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 50+ items: 10% discount</li>
                  <li>• 100+ items: 15% discount</li>
                  <li>• 500+ items: 20% discount</li>
                  <li>• Free customization on bulk orders</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}