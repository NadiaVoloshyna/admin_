const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const isProd = process.env.NODE_ENV === 'production';
const protocol = isProd ? 'https' : 'http';

module.exports = withCSS(withSass({
  webpack (config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'api': path.join(__dirname, 'api/'),
      'pages': path.join(__dirname, 'client/pages'),
      'shared': path.join(__dirname, 'client/shared'),
      'assets': path.join(__dirname, 'assets'),
      'utils': path.join(__dirname, 'client/utils'),
      'store': path.join(__dirname, 'client/store'),
    };
    return config;
  },

  publicRuntimeConfig: {
    baseUrl: `${protocol}://${process.env.BASE_URL}`
  }
}));