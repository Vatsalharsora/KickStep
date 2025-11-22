export async function GET() {
  try {
    const response = await fetch('http://localhost:3003/api/admin/v1/products?status=active')
    const data = await response.json()
    
    if (data.success) {
      // Only return active products for website
      const activeProducts = data.products.filter(product => product.status === 'active')
      return Response.json({ success: true, products: activeProducts })
    }
    
    return Response.json({ success: false, products: [] })
  } catch (error) {
    return Response.json({ success: false, products: [] })
  }
}