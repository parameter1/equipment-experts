const express = require('express');
const helmet = require('helmet');
const http = require('http');
const { log } = require('@parameter1/terminus/utils');

const app = express();
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.use(helmet({ contentSecurityPolicy: false }));

app.get('/', (req, res) => {
  log('redirecting');
  res.redirect(301, '/graphql');
});

app.get('/graphql', (req, res) => {
  res.send('hello, world.');
});

module.exports = http.createServer(app);
