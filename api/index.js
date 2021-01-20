'use strict';
const express = require('express');
const fetch = require('node-fetch');
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
router.get('/do', (req, res) => fetch('http://169.254.169.254/metadata/v1/').then(response => res.send(response)).catch(error => res.status(400).send(error)))

app.use(bodyParser.json());
app.use('/api', router)
app.use('/.netlify/functions/index', router);  // netlify

module.exports = app;
module.exports.handler = serverless(app);
