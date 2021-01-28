'use strict';
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const { getUser } = require('../fauna');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/fauna', async (req, res) => getUser().then(user => res.send(user)).catch(error => res.status(500).send(error)))
router.get('/env', (req, res) => {

  res.json({
    ...process.env,
    version: require('os').version(),
    platform: os.platform()
  })
});
router.get('/do', (req, res) => fetch('http://169.254.169.254/metadata/v1/').then(response => res.send(response.data)).catch(error => res.status(400).send(error)))

app.use(bodyParser.json());
app.use('/api', router)
app.use('/.netlify/functions/index', router);  // netlify

module.exports = app;
module.exports.handler = serverless(app);
