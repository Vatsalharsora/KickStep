# KICKSTEP - Corporate T-Shirt E-commerce Website

A modern, responsive e-commerce website for KICKSTEP, specializing in corporate t-shirts and bulk uniform orders.

## Features

- **Responsive Design** - Works perfectly on all devices
- **Product Catalog** - Browse and filter products with advanced search
- **Bulk Pricing** - Tiered pricing for bulk orders
- **Quote System** - Custom quote requests via WhatsApp and email
- **Admin Panel** - Manage products, orders, and customers
- **Blog Section** - Corporate uniform trends and tips
- **SEO Optimized** - Meta tags and structured data
- **Fast Performance** - Optimized images and lazy loading

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT
- **Email**: Nodemailer
- **Deployment**: Vercel

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kickstep.git
   cd kickstep
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.local` and update with your credentials:
   - Email configuration for quote requests
   - MongoDB connection string
   - JWT secret key
   - WhatsApp number

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
KICKSTEP/
├── app/
│   ├── components/          # Reusable components
│   ├── api/                # API routes
│   ├── products/           # Product pages
│   ├── contact/            # Contact page
│   ├── about/              # About page
│   ├── blog/               # Blog section
│   ├── auth/               # Authentication
│   └── admin/              # Admin panel
├── public/                 # Static assets
└── README.md
```

## Key Features

### Homepage
- Hero section with compelling CTA
- Why Choose Us section
- Featured products
- Customer testimonials
- Newsletter signup

### Product Catalog
- Advanced filtering (category, color, price)
- Search functionality
- Bulk pricing display
- Quote request system

### Product Details
- Multiple product images
- Bulk pricing tiers
- Size and color selection
- WhatsApp quote integration
- Customer reviews

### Contact & Quotes
- Contact form with quote requests
- Email notifications
- WhatsApp integration
- Business hours display

### Admin Features
- Product management
- Order tracking
- Customer management
- Analytics dashboard

## Revenue Model

1. **Bulk Orders** - Primary revenue from corporate clients
2. **Custom Printing** - Additional charges for logo printing/embroidery
3. **Premium Services** - Express delivery and design services
4. **Subscription Plans** - Regular uniform supply contracts

## SEO Features

- Meta tags optimization
- Structured data markup
- Sitemap generation
- Image optimization
- Fast loading speeds

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email info@kickstep.com or contact us via WhatsApp.