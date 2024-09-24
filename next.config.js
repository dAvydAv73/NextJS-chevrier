const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
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
  experimental: {
    esmExternals: 'loose',
    optimizeCss: true,
  },
  onDemandEntries: {
    // période en ms où les pages seront gardées en mémoire
    maxInactiveAge: 25 * 1000,
    // nombre de pages à garder en mémoire
    pagesBufferLength: 2,
  },
  webpack: (config, { isServer }) => {
    // Optimisations webpack
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
         // Ajoutez cette ligne pour augmenter la limite de taille des logs
        config.performance.maxAssetSize = 1000000;
        ...config.optimization.splitChunks.cacheGroups,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      };
    }

    // Ajout du support pour le top-level await
    config.experiments = { ...config.experiments, topLevelAwait: true };

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
      {
        source: '/:path*',
        destination: '/_error',
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);