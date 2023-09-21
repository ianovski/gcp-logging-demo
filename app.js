const express = require('express');
const { Logging } = require('@google-cloud/logging');
const logHttpRequest = require('./middleware/logHttpRequest.js');

const startServer = async () => {
  const app = express();
  app.use(logHttpRequest);

  app.get('/success', (req, res) => {
    res.status(200).send('Success! The request was successful.');
  });

  app.get('/fail', (req, res) => {
    res.status(400).send('Fail! The request failed.');
  });

  const port = 80;

  const server = app.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
  });
};

startServer();
