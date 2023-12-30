import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('user_token')
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!signin|_next/static|_next/image|favicon.ico).*)'
}
