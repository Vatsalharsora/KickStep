export async function GET(request) {
  try {
    const response = await fetch('http://localhost:3003/api/admin/v1/categories', {
      headers: {
        'Authorization': request.headers.get('Authorization') || ''
      }
    })
    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const response = await fetch('http://localhost:3003/api/admin/v1/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || ''
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 })
  }
}