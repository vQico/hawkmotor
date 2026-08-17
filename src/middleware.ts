import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all paths under /admin, EXCEPT /admin/login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminToken = request.cookies.get('hawk_admin_token')?.value;

    if (!adminToken) {
      // Missing token, redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Match only /admin routes to keep other pages blazing fast
export const config = {
  matcher: ['/admin/:path*'],
};
