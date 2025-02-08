import type { NextRequest } from 'next/server'
import authMiddleware from './middlewares/auth.middleware';
import loginMiddleware from './middlewares/login.middleware';
 
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  if (url.startsWith('/login')) {
    return loginMiddleware(request);
  } else {
    return authMiddleware(request);
  }
}

export const config = {
  matcher: ['/', '/login'],
}