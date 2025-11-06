const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCRwkF2sthL4ZZzRPdvxzy4-xF-wKifaxQ",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "happytime6.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "happytime6",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "happytime6.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "329135213175",
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:329135213175:web:2d3a72cfdccbf9a5a45472",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-QYYDX9DQ1R",
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    loader: "custom",
    loaderFile: "./loader.js",
    domains: ['via.placeholder.com', 'images.unsplash.com', 'placehold.co'],
  },
  
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, 'components'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/src': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  
  /*
  // Not a valid Next.js config option, will cause the server to fail
  // Keeping it here for reference in case the user meant a different config
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://3001-firebase-happy-time-*.cloudworkstations.dev"
  ],
  */
};

module.exports = nextConfig;


// Recommended images/domains (added by analyzer):
// images: { domains: ['via.placeholder.com'] }
