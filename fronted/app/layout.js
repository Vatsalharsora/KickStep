import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'KICKSTEP - Premium Corporate T-Shirts & Uniforms',
  description: 'Your partner in premium corporate t-shirts and bulk uniform orders. Quality, customization, and fast delivery for businesses.',
  keywords: 'corporate t-shirts, bulk orders, uniforms, custom printing, embroidery',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  )
}