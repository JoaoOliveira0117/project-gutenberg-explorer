import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
 
export default async function authMiddleware(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}