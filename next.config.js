const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css')
const withGraphql = require('next-plugin-graphql');

module.exports = withGraphql(withCSS(withSass({
  webpack (config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'queries': path.join(__dirname, 'queries/'),
      'api': path.join(__dirname, 'api/'),
      'pages': path.join(__dirname, 'client/pages'),
      'shared': path.join(__dirname, 'client/shared'),
      'assets': path.join(__dirname, 'assets'),
    };
    return config;
  }
})));