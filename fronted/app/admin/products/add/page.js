'use client'
import { useState, useEffect } from 'react'
import { FaUpload, FaTrash, FaPlus, FaMinus, FaSave } from 'react-icons/fa'

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    categoryId: '',
    brandId: '',
    status: 'draft',
    sku: '',
    barcode: '',
    hsn: '',
    gst: '',
    images: [],
    attributes: {
      sizes: [],
      colors: [],
      material: '',
      gsm: '',
      fit: '',
      pattern: ''
    },
    variants: [],
    basePrice: '',
    mrp: '',
    discount: '',
    tierPricing: [{ minQty: 1, maxQty: 10, price: '' }],
    totalStock: '',
    lowStockAlert: '',
    warehouseLocation: '',
    shipping: {
      weight: '',
      dimensions: { l: '', w: '', h: '' },
      class: 'standard'
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      slug: '',
      tags: ''
    },
    isFeatured: false,
    showOnHome: false,
    notes: ''
  })

  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [activeSection, setActiveSection] = useState(0)

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  const colorOptions = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Navy', value: '#000080' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#008000' },
    { name: 'Gray', value: '#808080' }
  ]

  useEffect(() => {
    fetchCategories()
    fetchBrands()
  }, [])

  useEffect(() => {
    if (formData.title) {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      setFormData(prev => ({
        ...prev,
        seo: { ...prev.seo, slug }
      }))
    }
  }, [formData.title])

  useEffect(() => {
    generateVariants()
  }, [formData.attributes.sizes, formData.attributes.colors])

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/admin/v1/categories')
      const data = await response.json()
      if (data.success) setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/admin/v1/brands')
      const data = await response.json()
      if (data.success) setBrands(data.brands || [])
    } catch (error) {
      console.error('Error fetching brands:', error)
    }
  }

  const generateVariants = () => {
    const { sizes, colors } = formData.attributes
    if (sizes.length > 0 && colors.length > 0) {
      const variants = []
      sizes.forEach(size => {
        colors.forEach(color => {
          const variantSku = `${formData.sku}-${color.toUpperCase()}-${size}`
          variants.push({
            sku: variantSku,
            color,
            size,
            price: formData.basePrice || '',
            bulkPrice: '',
            stock: '',
            weight: ''
          })
        })
      })
      setFormData(prev => ({ ...prev, variants }))
    }
  }

  const handleInputChange = (field, value, nested = null) => {
    if (nested) {
      setFormData(prev => ({
        ...prev,
        [nested]: { ...prev[nested], [field]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleAttributeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      attributes: { ...prev.attributes, [field]: value }
    }))
  }

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants]
    updatedVariants[index][field] = value
    setFormData(prev => ({ ...prev, variants: updatedVariants }))
  }

  const addTierPrice = () => {
    setFormData(prev => ({
      ...prev,
      tierPricing: [...prev.tierPricing, { minQty: '', maxQty: '', price: '' }]
    }))
  }

  const removeTierPrice = (index) => {
    setFormData(prev => ({
      ...prev,
      tierPricing: prev.tierPricing.filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageUrls = files.map(file => URL.createObjectURL(file))
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }))
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title || formData.title.length < 3) {
      newErrors.title = 'Title is required (min 3 characters)'
    }
    if (!formData.sku) {
      newErrors.sku = 'SKU is required'
    }
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required'
    }
    if (!formData.basePrice || formData.basePrice <= 0) {
      newErrors.basePrice = 'Base price is required and must be > 0'
    }
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch('http://localhost:3003/api/admin/v1/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      if (data.success) {
        alert('Product created successfully!')
      } else {
        alert('Error: ' + data.message)
      }
    } catch (error) {
      alert('Error creating product: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const sections = [
    'Basic Information',
    'Product Identifiers', 
    'Media & Images',
    'Attributes & Variants',
    'Pricing',
    'Inventory',
    'Shipping Details',
    'SEO Settings',
    'Additional Options'
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b p-6">
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600 mt-2">Create a new product for your inventory</p>
          </div>

          <div className="border-b p-4">
            <div className="flex flex-wrap gap-2">
              {sections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {activeSection === 0 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter product title"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Brief product description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Detailed product description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => handleInputChange('categoryId', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                    {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                    <select
                      value={formData.brandId}
                      onChange={(e) => handleInputChange('brandId', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Brand</option>
                      {brands.map(brand => (
                        <option key={brand._id} value={brand._id}>{brand.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Product Identifiers</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => handleInputChange('sku', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Product SKU"
                    />
                    {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Barcode / UPC</label>
                    <input
                      type="text"
                      value={formData.barcode}
                      onChange={(e) => handleInputChange('barcode', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Barcode"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">HSN Code</label>
                    <input
                      type="text"
                      value={formData.hsn}
                      onChange={(e) => handleInputChange('hsn', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="HSN Code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GST %</label>
                    <input
                      type="number"
                      value={formData.gst}
                      onChange={(e) => handleInputChange('gst', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="GST Percentage"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Media & Images</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Images *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FaUpload className="mx-auto text-gray-400 text-3xl mb-4" />
                    <p className="text-gray-600 mb-4">Drag and drop images or click to browse</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                    >
                      Choose Images
                    </label>
                  </div>
                  {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Attributes & Variants</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
                    <div className="flex flex-wrap gap-2">
                      {sizeOptions.map(size => (
                        <label key={size} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.attributes.sizes.includes(size)}
                            onChange={(e) => {
                              const sizes = e.target.checked
                                ? [...formData.attributes.sizes, size]
                                : formData.attributes.sizes.filter(s => s !== size)
                              handleAttributeChange('sizes', sizes)
                            }}
                            className="mr-2"
                          />
                          <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">{size}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map(color => (
                        <label key={color.name} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.attributes.colors.includes(color.name)}
                            onChange={(e) => {
                              const colors = e.target.checked
                                ? [...formData.attributes.colors, color.name]
                                : formData.attributes.colors.filter(c => c !== color.name)
                              handleAttributeChange('colors', colors)
                            }}
                            className="mr-2"
                          />
                          <span className="flex items-center px-3 py-1 bg-gray-100 rounded-lg text-sm">
                            <span
                              className="w-4 h-4 rounded-full mr-2 border"
                              style={{ backgroundColor: color.value }}
                            ></span>
                            {color.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                    <input
                      type="text"
                      value={formData.attributes.material}
                      onChange={(e) => handleAttributeChange('material', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Cotton"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fabric GSM</label>
                    <input
                      type="number"
                      value={formData.attributes.gsm}
                      onChange={(e) => handleAttributeChange('gsm', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="180"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fit Type</label>
                    <select
                      value={formData.attributes.fit}
                      onChange={(e) => handleAttributeChange('fit', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Fit</option>
                      <option value="Regular">Regular</option>
                      <option value="Slim">Slim</option>
                      <option value="Loose">Loose</option>
                    </select>
                  </div>
                </div>

                {formData.variants.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Product Variants</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 border-b text-left">SKU</th>
                            <th className="px-4 py-2 border-b text-left">Color</th>
                            <th className="px-4 py-2 border-b text-left">Size</th>
                            <th className="px-4 py-2 border-b text-left">Price</th>
                            <th className="px-4 py-2 border-b text-left">Bulk Price</th>
                            <th className="px-4 py-2 border-b text-left">Stock</th>
                            <th className="px-4 py-2 border-b text-left">Weight</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.variants.map((variant, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 border-b">
                                <input
                                  type="text"
                                  value={variant.sku}
                                  onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                                  className="w-full px-2 py-1 border rounded"
                                />
                              </td>
                              <td className="px-4 py-2 border-b">{variant.color}</td>
                              <td className="px-4 py-2 border-b">{variant.size}</td>
                              <td className="px-4 py-2 border-b">
                                <input
                                  type="number"
                                  value={variant.price}
                                  onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                  className="w-full px-2 py-1 border rounded"
                                />
                              </td>
                              <td className="px-4 py-2 border-b">
                                <input
                                  type="number"
                                  value={variant.bulkPrice}
                                  onChange={(e) => handleVariantChange(index, 'bulkPrice', e.target.value)}
                                  className="w-full px-2 py-1 border rounded"
                                />
                              </td>
                              <td className="px-4 py-2 border-b">
                                <input
                                  type="number"
                                  value={variant.stock}
                                  onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                                  className="w-full px-2 py-1 border rounded"
                                />
                              </td>
                              <td className="px-4 py-2 border-b">
                                <input
                                  type="number"
                                  step="0.01"
                                  value={variant.weight}
                                  onChange={(e) => handleVariantChange(index, 'weight', e.target.value)}
                                  className="w-full px-2 py-1 border rounded"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeSection === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Base Price *</label>
                    <input
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => handleInputChange('basePrice', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                    {errors.basePrice && <p className="text-red-500 text-sm mt-1">{errors.basePrice}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">MRP</label>
                    <input
                      type="number"
                      value={formData.mrp}
                      onChange={(e) => handleInputChange('mrp', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Discount %</label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => handleInputChange('discount', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Tier Pricing (Bulk Rates)</h3>
                    <button
                      type="button"
                      onClick={addTierPrice}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                    >
                      <FaPlus className="mr-2" /> Add Tier
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.tierPricing.map((tier, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="flex-1">
                          <input
                            type="number"
                            value={tier.minQty}
                            onChange={(e) => {
                              const updated = [...formData.tierPricing]
                              updated[index].minQty = e.target.value
                              setFormData(prev => ({ ...prev, tierPricing: updated }))
                            }}
                            placeholder="Min Qty"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="number"
                            value={tier.maxQty}
                            onChange={(e) => {
                              const updated = [...formData.tierPricing]
                              updated[index].maxQty = e.target.value
                              setFormData(prev => ({ ...prev, tierPricing: updated }))
                            }}
                            placeholder="Max Qty"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="number"
                            value={tier.price}
                            onChange={(e) => {
                              const updated = [...formData.tierPricing]
                              updated[index].price = e.target.value
                              setFormData(prev => ({ ...prev, tierPricing: updated }))
                            }}
                            placeholder="Price"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTierPrice(index)}
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                        >
                          <FaMinus />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t">
              <div className="flex space-x-4">
                {activeSection > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveSection(activeSection - 1)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                )}
                {activeSection < sections.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveSection(activeSection + 1)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Next
                  </button>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('status', 'draft')}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center disabled:opacity-50"
                >
                  <FaSave className="mr-2" />
                  {loading ? 'Creating...' : 'Create Product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}