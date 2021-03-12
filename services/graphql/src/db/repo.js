const { Repo } = require('@parameter1/mongodb/repo');
const client = require('./client');
const { BASECMS_TENANT_KEY } = require('../env');

const repo = new Repo({
  name: 'website search_index',
  client,
  dbName: `${BASECMS_TENANT_KEY}_website`,
  collectionName: 'SearchIndex',
});

repo.coerceObjectId = Repo.coerceObjectId;

module.exports = repo;
