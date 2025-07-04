import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Public routes that do not require authentication
const PUBLIC_ROUTES = ['/', '/login', '/register'];
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  // Check if the route is public
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // If there's a token, the user is likely logged in
  if (token) {
    try {
      // Verify the token is valid
      await jwtVerify(token, JWT_SECRET);

      // If the user is logged in and tries to access a public route,
      // redirect them to a protected route (e.g., dashboard).
      if (isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    } catch (err) {
      // If token verification fails, it's invalid.
      // Redirect to login and clear the invalid cookie.
      console.error('JWT verification failed:', err);
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('token');
      return response;
    }
  } else {
    // If there's no token and the user tries to access a protected route,
    // redirect them to the login page.
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - any path with a file extension (e.g., .png, .jpg, .svg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};