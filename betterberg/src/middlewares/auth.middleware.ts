import Cookies from '@/http/cookies'
import { NextResponse, type NextRequest } from 'next/server'
 
export default async function authMiddleware(request: NextRequest) {
  const cookieStore = await Cookies.initialize()
  const token = cookieStore.getValue('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}