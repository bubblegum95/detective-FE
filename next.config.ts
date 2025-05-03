import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // React Strict Mode 활성화
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_KAKAO_APP_KEY: process.env.NEXT_PUBLIC_KAKAO_APP_KEY,
  },
  images: {
    remotePatterns: [
      { hostname: 'encrypted-tbn0.gstatic.com' },
      { hostname: '127.0.0.1' },
      { hostname: 'bubblegum.xn--3e0b707e' },
    ],
  },
};

export default nextConfig;
