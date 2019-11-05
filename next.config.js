const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css')
const withGraphql = require('next-plugin-graphql');

module.exports = withGraphql(withCSS(withSass({
  webpack (config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'components': path.join(__dirname, 'components/'),
      'queries': path.join(__dirname, 'queries/'),
      'utils': path.join(__dirname, 'utils/'),
      'api': path.join(__dirname, 'api/'),
      'actions': path.join(__dirname, 'store/actions'),
    };
    return config;
  }
})));