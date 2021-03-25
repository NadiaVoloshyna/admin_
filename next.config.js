const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const protocol = isProd ? 'https' : 'http';

module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      pages: path.join(__dirname, 'client/pages'),
      shared: path.join(__dirname, 'client/shared'),
      assets: path.join(__dirname, 'assets'),
      utils: path.join(__dirname, 'client/utils'),
      store: path.join(__dirname, 'client/store'),
      common: path.join(__dirname, 'common'),
    };
    return config;
  },

  publicRuntimeConfig: {
    baseUrl: `${protocol}://${process.env.BASE_URL}`,
    assetsUrl: process.env.ASSETS_BUCKET_URL,
  },
};
