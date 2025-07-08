/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [ {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // This allows any path on that hostname
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },],
  },
};

export default nextConfig;

export const config = {
  matcher: [
    /*
     * Apply middleware to all routes except API and public files:
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};