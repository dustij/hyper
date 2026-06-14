import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_PATHS = ['/login', '/signup', '/api/auth'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next();
  }

  // it's recommended to only check for the existence of a session cookie to handle
  // redirection to avoid blocking requests by making API or database calls.
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!login|signup|api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
