const {
  bool,
  port,
  cleanEnv,
  str,
} = require('envalid');

module.exports = cleanEnv(process.env, {
  BASE_MONGO_URI: str({ desc: 'The BaseCMS MongoDB instance to connect to.' }),
  API_URI: str({ desc: 'The external API URI', default: 'https://www.equipmentexperts.com/api/v1' }),
  API_TOKEN: str({ desc: 'The API token to use with the API_URI' }),

  HOST: str({ desc: 'The host that the service will run on.', default: '0.0.0.0' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: str({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  PORT: port({ desc: 'The port that the service will run on.', default: 80 }),
});
