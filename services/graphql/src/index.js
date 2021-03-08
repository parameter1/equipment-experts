require('./newrelic');
const bootService = require('@parameter1/terminus/boot-service');
const { log } = require('@parameter1/terminus/utils');
const { filterUri } = require('@parameter1/mongodb/utils');
const basedb = require('./db/client');
const newrelic = require('./newrelic');
const server = require('./server');
const pkg = require('../package.json');
const { HOST, PORT } = require('./env');

process.on('unhandledRejection', (e) => {
  newrelic.noticeError(e);
  throw e;
});

bootService({
  name: pkg.name,
  version: pkg.version,
  server,
  host: HOST,
  port: PORT,
  onError: newrelic.noticeError.bind(newrelic),
  onStart: async () => basedb.connect().then((client) => log(filterUri(client))),
  onSignal: () => basedb.close(),
  onHealthCheck: () => basedb.ping({ id: pkg.name }).then(() => 'basedb okay'),
}).catch((e) => setImmediate(() => {
  newrelic.noticeError(e);
  throw e;
}));
