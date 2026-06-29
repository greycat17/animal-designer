/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['*.dev.coze.site'],
  env: {
    COZE_PROJECT_DOMAIN_DEFAULT: process.env.COZE_PROJECT_DOMAIN_DEFAULT || '',
  },
  images: {
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
