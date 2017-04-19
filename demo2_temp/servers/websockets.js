var WebSocketServer = require('ws').Server,
    resources = require('./../resources/model');


var ws1;
var wss;

var connected = false;
var switchValue = "";

//console.log("switch Value" + switchValue)

exports.observer = function (obj) {
    if (connected){
        ws1.send((JSON.stringify(obj)), function () {
		console.log("-----obj. sent----")
        });
    }
};

exports.listen = function(server) {
    wss = new WebSocketServer({server: server}); //#A
//    wss = new WebSocketServer({port: 7080});
    console.info('WebSocket server started...');
    wss.on('connection', function(ws) {
	console.log("-----22-----")
        ws.on('message', function(message) {
            console.log('received: %s', message);
        });
        ws.send('something');
    });
 
};

function selectResouce(url) { //#E
    var parts = url.split('/');
    parts.shift();
    switchValue = parts[2];
    var result = resources;
    for (var i = 0; i < parts.length; i++) {
        result = result[parts[i]];
    }
    connected = true;
    return result;

}
