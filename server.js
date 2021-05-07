const express = require('express');
const https = require('https');
const { join } = require('path');
const port = 4853;
const app = express();
const sslConfig = require('./ssl-config');

const options = {
  key: sslConfig.privateKey,
  cert: sslConfig.certificate
};

app.use(express.static(join(__dirname, 'dist', 'angular-gojs')));

app.get('**', (undefined, res) => {
  res.sendFile(join(__dirname, 'dist', 'angular-gojs', 'index.html'));
});

https.createServer(options, app).listen(port, () => {
  console.log('Server run port: ' + port);
});
