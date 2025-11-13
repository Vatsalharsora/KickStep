// API configuration and utility functions
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

class ApiClient {
  constructor() {
    this.baseURL = BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed')
      }
      
      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Auth methods
  async signin(email, password) {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  }

  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  // Quote methods
  async submitQuote(quoteData) {
    return this.request('/quotes', {
      method: 'POST',
      body: JSON.stringify(quoteData)
    })
  }
}

export const apiClient = new ApiClient()

// Convenience functions
export const signin = (email, password) => apiClient.signin(email, password)
export const signup = (userData) => apiClient.signup(userData)
export const submitQuote = (quoteData) => apiClient.submitQuote(quoteData)