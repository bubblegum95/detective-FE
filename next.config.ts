import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // React Strict Mode 활성화
  env: {
    BASE_URL: process.env.BASE_URL,
    LOGOUT: process.env.LOGOUT,
    MY_PAGE: process.env.MY_PAGE,
  },
  images: {
    // domains: ['encrypted-tbn0.gstatic.com', '127.0.0.1'], // 사용할 이미지 도메인 추가
    remotePatterns: [
      { hostname: 'encrypted-tbn0.gstatic.com' },
      { hostname: '127.0.0.1' },
    ],
  },
};

export default nextConfig;
