/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*.dev.coze.site'],
  output: 'export',
  env: {
    COZE_PROJECT_DOMAIN_DEFAULT: process.env.COZE_PROJECT_DOMAIN_DEFAULT || '',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
