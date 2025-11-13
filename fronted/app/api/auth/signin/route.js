import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3003'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Make request to backend login endpoint
    const response = await fetch(`${BACKEND_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: data.user,
        token: data.token
      })
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || 'Login failed'
      }, { status: response.status })
    }
  } catch (error) {
    console.error('Signin API error:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}