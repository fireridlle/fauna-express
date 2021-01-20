'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/env', (req, res) => res.json(process.env));

app.use(bodyParser.json());
app.use('/api', router)
app.use('/.netlify/functions/server', router);  // netlify

module.exports = app;
module.exports.handler = serverless(app);
