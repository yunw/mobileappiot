
var httpServer = require('./servers/http'),
  wsServer = require('./servers/websockets'),
  resources = require('./resources/model');

// Internal Plugins
var ledsPlugin = require('./plugins/internal/ledsPlugin'), //#A
  pirPlugin = require('./plugins/internal/pirPlugin'), //#A
  dhtPlugin = require('./plugins/internal/DHT11SensorPlugin');
//  dhtPlugin = require('./plugins/internal/DHT22SensorPlugin'); //#A

// External Plugins for sensors/actuators connected to the PI GPIOs
// If you test this with real sensors do not forget to set simulate to 'true'
//pirPlugin.start({'simulate': true, 'frequency': 2000}); //#B
//ledsPlugin.start({'simulate': false, 'frequency': 10000}); //#B
dhtPlugin.start({'simulate': false, 'frequency': 10000}); //#B

// External Plugins
var coapPlugin = require('./plugins/external/coapPlugin');
//coapPlugin.start({'simulate': true, 'frequency': 10000});

const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});


// HTTP Server
server = httpServer.listen(resources.pi.port, function () {
  console.log('HTTP server started...');

  // Websockets server
//  wsServer.listen(server);

  console.info('My WoT Pi is up and running on port %s', resources.pi.port);
});
