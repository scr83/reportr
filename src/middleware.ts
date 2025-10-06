import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Temporarily simplified middleware for debugging
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  console.log('🚀 Simple Middleware - Path:', pathname)
  
  // Allow all routes for now (debugging)
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
}