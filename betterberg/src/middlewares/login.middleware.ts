import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
 
export default async function loginMiddleware(request: NextRequest) {
  const queryToken = request.nextUrl.searchParams.get('token')

  if (queryToken) {
    const cookieStore = await cookies()

    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/me`, {
      headers: {
        'Authorization': 'Bearer ' + queryToken,
      }
    })

    if (!response.ok) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const data = await response.json()

    cookieStore.set('token', queryToken)
    cookieStore.set('user_id', data.id)
    
    return NextResponse.redirect(new URL('/', request.url))
  }
}