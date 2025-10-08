import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // More permissive CSP for Google OAuth
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com blob:",
      "style-src 'self' 'unsafe-inline' https://accounts.google.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://accounts.google.com https://oauth2.googleapis.com https://www.googleapis.com blob:",
      "frame-src 'self' https://accounts.google.com",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'"
    ].join('; ')
  );
  
  console.log('Middleware setting CSP headers for:', request.nextUrl.pathname);
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};