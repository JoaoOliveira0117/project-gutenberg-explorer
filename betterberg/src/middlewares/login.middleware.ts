import Cookies from '@/http/cookies'
import UserService from '@/services/userService';
import { NextResponse, type NextRequest } from 'next/server'
 
export default async function loginMiddleware(request: NextRequest) {
  const queryToken = request.nextUrl.searchParams.get('token')
  const cookies = await Cookies.getInstance()

  if (!queryToken) {
    return;
  }

  const service = await UserService.getInstance()

  const data = await service.getUserMe({
    'Authorization': 'Bearer ' + queryToken,
  })

  cookies.setValue('token', queryToken)
  
  return NextResponse.redirect(new URL('/books', request.url))
}