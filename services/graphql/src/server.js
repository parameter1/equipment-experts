const express = require('express');
const helmet = require('helmet');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { get, set } = require('@parameter1/utils');
const { isProduction } = require('./env');
const schema = require('./schema');
const repo = require('./db/repo');
const client = require('./api-client');

const { STATUS_CODES } = http;

const app = express();
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.use(helmet({ contentSecurityPolicy: false }));

app.get('/', (req, res) => {
  res.redirect(301, '/graphql');
});

const path = '/graphql';
const server = new ApolloServer({
  schema,
  tracing: !isProduction,
  cacheControl: isProduction,
  introspection: !isProduction,
  debug: isProduction ? false : { endpoint: path },
  playground: !isProduction,
  formatError: (err) => {
    const code = get(err, 'extensions.exception.statusCode');
    if (code) set(err, 'extensions.code', STATUS_CODES[code].replace(/\s/g, '_').toUpperCase());
    return err;
  },
  context: ({ req }) => ({ req, repo, client }),
});
server.applyMiddleware({ app, path });

module.exports = http.createServer(app);
