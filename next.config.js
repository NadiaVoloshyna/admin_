const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const protocol = isProd ? 'https' : 'http';

module.exports = {
  webpack(config) {
    // Settings for support :global in css modules
    const oneOf = config.module.rules.find(
      (rule) => typeof rule.oneOf === 'object'
    );

    const fixUse = (use) => {
      if (use.loader.indexOf('css-loader') >= 0 && use.options.modules) {
        use.options.modules.mode = 'local';
      }
    };
    if (oneOf) {
      oneOf.oneOf.forEach((rule) => {
        if (Array.isArray(rule.use)) {
          rule.use.map(fixUse);
        } else if (rule.use && rule.use.loader) {
          fixUse(rule.use);
        }
      });
    }

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
    baseUrl: `${protocol}://${process.env.BASE_URL}`
  }
};
