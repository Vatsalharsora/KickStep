'use client'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '1234567890' // Replace with actual WhatsApp number
    const message = 'Hi! I\'m interested in bulk t-shirt orders from KICKSTEP.'
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button 
      onClick={handleWhatsAppClick}
      className="whatsapp-float"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp />
    </button>
  )
}