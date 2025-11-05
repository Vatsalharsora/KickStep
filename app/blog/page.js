import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: 'Corporate Uniform Trends for 2024',
    excerpt: 'Discover the latest trends in corporate uniforms and how they can enhance your brand image.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=250&fit=crop',
    date: 'March 15, 2024',
    category: 'Trends'
  },
  {
    id: 2,
    title: 'Choosing the Right Fabric for Your Team',
    excerpt: 'A comprehensive guide to selecting the perfect fabric for comfort, durability, and style.',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=250&fit=crop',
    date: 'March 10, 2024',
    category: 'Guide'
  },
  {
    id: 3,
    title: 'Custom Printing vs Embroidery: Which is Better?',
    excerpt: 'Compare the pros and cons of different customization methods for your corporate apparel.',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=250&fit=crop',
    date: 'March 5, 2024',
    category: 'Customization'
  },
  {
    id: 4,
    title: 'Bulk Order Best Practices',
    excerpt: 'Tips for planning and managing large uniform orders for your organization.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
    date: 'February 28, 2024',
    category: 'Business'
  },
  {
    id: 5,
    title: 'Sustainable Corporate Apparel Solutions',
    excerpt: 'How eco-friendly uniforms can benefit your company and the environment.',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=250&fit=crop',
    date: 'February 20, 2024',
    category: 'Sustainability'
  },
  {
    id: 6,
    title: 'Color Psychology in Corporate Uniforms',
    excerpt: 'Understanding how uniform colors affect brand perception and employee morale.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=250&fit=crop',
    date: 'February 15, 2024',
    category: 'Psychology'
  }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">KICKSTEP Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest trends, tips, and insights in corporate apparel and uniform solutions.
        </p>
      </div>

      {/* Featured Post */}
      <div className="mb-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <Image 
              src={blogPosts[0].image}
              alt={blogPosts[0].title}
              width={600}
              height={400}
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="p-8">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                {blogPosts[0].category}
              </span>
              <h2 className="text-3xl font-bold mt-4 mb-4">{blogPosts[0].title}</h2>
              <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{blogPosts[0].date}</span>
                <Link href={`/blog/${blogPosts[0].id}`} className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <Image 
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
              <h3 className="text-xl font-semibold mt-3 mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{post.date}</span>
                <Link href={`/blog/${post.id}`} className="text-primary hover:text-blue-700 font-semibold">
                  Read More →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 bg-primary text-white p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-xl mb-6">Subscribe to our newsletter for the latest corporate apparel insights</p>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-l-lg text-black focus:outline-none"
          />
          <button className="bg-secondary text-black px-6 py-3 rounded-r-lg hover:bg-yellow-500 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}