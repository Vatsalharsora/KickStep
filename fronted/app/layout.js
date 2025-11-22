'use client'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin-portal-2024')

  return (
    <html lang="en">
      <body>
        {!isAdminPage && <Navbar />}
        <main className={isAdminPage ? '' : 'pt-24'}>{children}</main>
        {!isAdminPage && <Footer />}
      </body>
    </html>
  )
}