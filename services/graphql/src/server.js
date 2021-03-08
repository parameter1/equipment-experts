const { log } = require('@parameter1/terminus/utils');
const http = require('http');

const server = http.createServer((req, res) => {
  log(`Processing request: ${req.url}`);
  res.write('hello, world');
  res.end();
});

module.exports = server;
