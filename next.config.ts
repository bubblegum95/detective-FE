import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // React Strict Mode 활성화
  swcMinify: true, // SWC를 사용하여 코드 최적화
  env: {
    BASE_URL: process.env.BASE_URL,
    LOGOUT: process.env.LOGOUT,
    MY_PAGE: process.env.MY_PAGE,
  },
  images: {
    domains: ['encrypted-tbn0.gstatic.com'], // 사용할 이미지 도메인 추가
  },
};

export default nextConfig;
