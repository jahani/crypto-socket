var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const config = require('./config.js');

var exchanges = new (require('./models/Exchanges.js'))();

server.listen(config.server.port, config.server.host);
console.log(`Running on ${config.server.host}:${config.server.port}`);

app.use('/', express.static(config.publicPath));

app.get('/', function(request, response) {
    response.sendFile(config.publicPath + '/index.html');
})


var connectionsCount = 0;

io.on('connection', function (socket) {

    socket.emit('exchanges.list', exchanges.list );

    connectionsCount++;
    io.emit('connections.count', connectionsCount);

    socket.on('disconnect', (reason) => {
        connectionsCount--;
        io.emit('connections.count', connectionsCount);
    });
    
})

setInterval(() => exchanges.broadcastPrices(io, 'exchanges.price'), 3100);