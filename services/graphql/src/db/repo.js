const { Repo } = require('@parameter1/mongodb/repo');
const client = require('./client');
const { BASECMS_TENANT_KEY } = require('../env');

module.exports = new Repo({
  name: 'website search_index',
  client,
  dbName: `${BASECMS_TENANT_KEY}_website`,
  collectionName: 'SearchIndex',
});
