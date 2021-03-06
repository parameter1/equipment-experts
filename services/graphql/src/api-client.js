const fetch = require('node-fetch');
const { getAsArray } = require('@parameter1/utils');
const { API_URI, API_TOKEN } = require('./env');
const { name, version } = require('../package.json');

const error = (message) => ({ total: 0, results: [], error: `${message}` });

const find = async ({
  type,
  query = '',
  page = 1,
  perPage = 100,
} = {}) => {
  const endpoint = type === 'industries' ? type : `${type}/suggest-search`;
  const url = `${API_URI}/${endpoint}?q=${query}&per_page=${perPage}&page=${page}`;

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'user-agent': `${name} v${version}`,
      accept: 'application/json',
    },
  });

  if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
  return res.json();
};

/**
 * Retrieves data from the EE API based on the supplied type and query
 */
module.exports = {
  async findIndustries({ page = 1 } = {}) {
    try {
      const json = await find({ type: 'industries', page });
      const results = getAsArray(json, 'data').map((r) => r.Industry);
      return { results, total: results.length };
    } catch (e) {
      return error(e);
    }
  },
  async findManufacturers({ page = 1, query = '' } = {}) {
    try {
      const json = await find({ type: 'manufacturers', query, page });
      const results = getAsArray(json, 'data').map((r) => r.displayName);
      return { results, total: results.length };
    } catch (e) {
      return error(e);
    }
  },
  async findModels({ page = 1, query = '' } = {}) {
    try {
      const json = await find({ type: 'models', query, page });
      const results = getAsArray(json, 'data').map((r) => r.displayName);
      return { results, total: results.length };
    } catch (e) {
      return error(e);
    }
  },
};
