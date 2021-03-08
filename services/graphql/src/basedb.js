const MongoDBClient = require('@parameter1/mongodb/client');
const { BASECMS_MONGO_DSN } = require('./env');
const { name, version } = require('../package.json');

module.exports = new MongoDBClient({
  url: BASECMS_MONGO_DSN,
  options: { appname: `${name} v${version}` },
});
