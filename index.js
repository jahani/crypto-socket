var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

const options = {
    publicPath: __dirname + '/public',
};

var exchanges = new (require('./models/Exchanges.js'))();

server.listen(PORT, HOST);
console.log(`Running on ${HOST}:${PORT}`);

app.use('/', express.static(options.publicPath));

app.get('/', function(request, response) {
    response.sendFile(options.publicPath + '/index.html');
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

