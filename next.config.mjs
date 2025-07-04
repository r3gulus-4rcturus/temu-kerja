/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

export const config = {
  matcher: [
    /*
     * Apply middleware to all routes except API and public files:
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};