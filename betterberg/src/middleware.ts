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
  /*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico, sitemap.xml, robots.txt (metadata files)
  */
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
}