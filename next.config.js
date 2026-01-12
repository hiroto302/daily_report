/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // 本番環境での最適化
  swcMinify: true,
  // 画像の最適化設定
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // 環境変数の検証
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
};

module.exports = nextConfig;
