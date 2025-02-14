import Cookies from '@/http/cookies'
import UserService from '@/services/userService';
import { NextResponse, type NextRequest } from 'next/server'
 
export default async function loginMiddleware(req: NextRequest) {
  const queryToken = req.nextUrl.searchParams.get('token')
  const cookies = await Cookies.initialize()

  if (!queryToken) {
    return;
  }

  const service = await UserService.getInstance()

  await service.getUserByToken({
    'Authorization': 'Bearer ' + queryToken,
  })

  console.log(queryToken)
  cookies.setValue('token', queryToken)
  
  return NextResponse.redirect(new URL('/books', req.url))
}