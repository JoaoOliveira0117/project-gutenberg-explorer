import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
 
export default async function loginMiddleware(request: NextRequest) {
  const queryToken = request.nextUrl.searchParams.get('token')

  if (queryToken) {
    const cookieStore = await cookies()
    cookieStore.set('token', queryToken)
    return NextResponse.redirect(new URL('/', request.url))
  }
}