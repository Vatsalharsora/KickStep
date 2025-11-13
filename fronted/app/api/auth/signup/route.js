import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3003'

export async function POST(request) {
  try {
    const body = await request.json()
    const { fullname, companyname, email, password, confirmPassword } = body

    // Make request to backend signup endpoint
    const response = await fetch(`${BACKEND_URL}/api/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullname, companyname, email, password, confirmPassword })
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        user: data.user
      })
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || 'Signup failed'
      }, { status: response.status })
    }
  } catch (error) {
    console.error('Signup API error:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}