require('dotenv').config();
const {
  bool,
  cleanEnv,
  str,
  port,
} = require('envalid');

// https://github.com/af/envalid/issues/65 devDefault is no longer assumed
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = cleanEnv(process.env, {
  // App configs
  BASECMS_MONGO_DSN: str({ desc: 'The BaseCMS MongoDB instance to connect to.', devDefault: 'mongodb://localhost:27107' }),
  BASECMS_TENANT_KEY: str({ desc: 'The BaseCMS tenant key', default: 'randallreilly_all' }),
  API_URI: str({ desc: 'The external API URI', default: 'https://www.equipmentexperts.com/api/v1' }),
  API_TOKEN: str({ desc: 'The API token to use with the API_URI' }),
  // Infra configs
  HOST: str({ desc: 'The host that the service will run on.', default: '0.0.0.0' }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: str({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  PORT: port({ desc: 'The port that the service will run on.', default: 80 }),
});
