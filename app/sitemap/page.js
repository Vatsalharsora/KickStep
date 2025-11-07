import Link from 'next/link'
import { FaHome, FaShoppingBag, FaInfoCircle, FaBlog, FaPhone, FaUser, FaShoppingCart, FaFileAlt, FaShield } from 'react-icons/fa'

export default function Sitemap() {
  const sitePages = [
    {
      category: 'Main Pages',
      icon: FaHome,
      pages: [
        { name: 'Home', url: '/', description: 'Welcome to KICKSTEP - Corporate T-Shirt Solutions' },
        { name: 'Products', url: '/products', description: 'Browse our premium corporate t-shirt collection' },
        { name: 'About Us', url: '/about', description: 'Learn about our company and mission' },
        { name: 'Blog', url: '/blog', description: 'Corporate uniform trends and industry insights' },
        { name: 'Contact', url: '/contact', description: 'Get in touch for quotes and support' }
      ]
    },
    {
      category: 'User Account',
      icon: FaUser,
      pages: [
        { name: 'Login', url: '/auth/login', description: 'Sign in to your account' },
        { name: 'Register', url: '/auth/register', description: 'Create a new account' },
        { name: 'Shopping Cart', url: '/cart', description: 'View and manage your cart items' }
      ]
    },
    {
      category: 'Legal & Support',
      icon: FaFileAlt,
      pages: [
        { name: 'Privacy Policy', url: '/privacy', description: 'Our privacy and data protection policy' },
        { name: 'Terms of Service', url: '/terms', description: 'Terms and conditions of use' },
        { name: 'Size Guide', url: '/size-guide', description: 'T-shirt sizing information and charts' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Site Map</h1>
          <p className="text-lg sm:text-xl text-blue-200">Navigate through all pages of KICKSTEP</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {sitePages.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl mr-4">
                  <section.icon className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{section.category}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {section.pages.map((page, pageIndex) => (
                  <Link 
                    key={pageIndex}
                    href={page.url}
                    className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                          {page.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {page.description}
                        </p>
                        <div className="mt-3">
                          <span className="text-blue-500 text-sm font-medium group-hover:underline">
                            Visit Page →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 mt-12">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Quick Navigation</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-4 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Main Pages</div>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">User Pages</div>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Legal Pages</div>
              </div>
              <div className="bg-white p-4 rounded-xl">
                <div className="text-2xl font-bold text-orange-600">11</div>
                <div className="text-sm text-gray-600">Total Pages</div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Help Finding Something?</h3>
              <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help!</p>
              <Link 
                href="/contact"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <FaPhone className="mr-3" style={{transform: 'scaleX(-1)'}} />
                Contact Support
                <span className="ml-3">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}