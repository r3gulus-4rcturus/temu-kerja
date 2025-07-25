/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [ {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },],
  },
  
  // --- ADD THIS BLOCK TO SOLVE THE PDFKIT ISSUE ---
  experimental: {
    serverComponentsExternalPackages: ['pdfkit'],
  },
  // ---------------------------------------------
};

export default nextConfig;