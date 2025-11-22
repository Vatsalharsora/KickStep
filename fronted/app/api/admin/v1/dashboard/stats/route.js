export async function GET(request) {
  try {
    const response = await fetch('http://localhost:3003/api/admin/v1/dashboard/stats', {
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