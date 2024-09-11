const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
      protocol: 'http',
      hostname: process.env.WP_IMAGES_URL,
      port: '',
      pathname: '/**' 
      },
      {
      protocol: 'https',
      hostname: process.env.WP_IMAGES_URL,
      port: '',
      pathname: '/**' 
      }
   ],
  },
};

module.exports = withNextIntl(nextConfig);
