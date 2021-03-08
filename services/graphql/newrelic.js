const pkg = require('./package.json');

/**
 * New Relic agent configuration.
 * @see https://github.com/newrelic/node-newrelic/blob/main/lib/config/default.js
 */
exports.config = {
  app_name: [pkg.name],
  rules: {
    ignore: [/^\/_health$/],
  },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie',
      'request.headers.authorization',
      'request.headers.proxyAuthorization',
      'request.headers.setCookie*',
      'response.headers.cookie',
      'response.headers.authorization',
      'response.headers.proxyAuthorization',
      'response.headers.setCookie*',
    ],
  },
};
