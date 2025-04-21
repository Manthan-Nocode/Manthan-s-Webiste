import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow login page and static files
  if (
    request.nextUrl.pathname === '/manthanadmin/login' ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static')
  ) {
    return NextResponse.next();
  }
  // Check for admin_session cookie
  const adminSession = request.cookies.get('admin_session');
  if (adminSession?.value === 'authenticated') {
    return NextResponse.next();
  }
  // If not authenticated, redirect to login
  return NextResponse.redirect(new URL('/manthanadmin/login', request.url));
}

export const config = {
  matcher: ['/manthanadmin/:path*'],
};
