import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// --- Configuration ---

// 1. Public routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/login', '/register'];
const registerSuccessPage = '/register/success';

// 2. Role-based permissions. Defines which paths a role is NOT allowed to access.
//    (Corrected based on your feedback)
const ROLE_PERMISSIONS = {
  // A jobseeker CANNOT access the jobprovider's dashboard
  jobseeker: ['/dashboard'],
  // A jobprovider CANNOT access the jobseeker's pages
  jobprovider: ['/seeker-dashboard', '/layanan-hukum', '/pelatihan-kerja'],
};

// 3. The primary dashboard for each role.
//    (Corrected based on your feedback)
const ROLE_DASHBOARDS = {
  jobseeker: '/seeker-dashboard',
  jobprovider: '/dashboard',
  default: '/dashboard',
};

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

// --- Middleware Logic (No changes needed here) ---

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  const isPublicRoute = PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
  
  if (token) {
    try {
      // Decode the token to get the payload
      const { payload } = await jwtVerify(token, JWT_SECRET);
      const userRole = (payload.role as keyof typeof ROLE_PERMISSIONS) || 'jobseeker';

      // A. LOGGED-IN user tries to access a PUBLIC page (e.g., /login)
      if (isPublicRoute && pathname !== registerSuccessPage) {
        const dashboardUrl = ROLE_DASHBOARDS[userRole] || ROLE_DASHBOARDS.default;
        return NextResponse.redirect(new URL(dashboardUrl, req.url));
      }

      // B. LOGGED-IN user tries to access a PROTECTED page
      const forbiddenPaths = ROLE_PERMISSIONS[userRole];
      if (forbiddenPaths && forbiddenPaths.some(path => pathname.startsWith(path))) {
        const dashboardUrl = ROLE_DASHBOARDS[userRole] || ROLE_DASHBOARDS.default;
        return NextResponse.redirect(new URL(dashboardUrl, req.url));
      }

    } catch (err) {
      // C. Token is invalid or expired.
      console.error('JWT verification failed:', err);
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('token');
      return response;
    }
  } else {
    // D. NOT LOGGED-IN user tries to access a PROTECTED page
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // E. Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};