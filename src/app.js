var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const config = require('./config.js');

var exchanges = new (require('./models/Exchanges.js'))();
var globalExchanges = new (require('./models/GlobalExchanges.js'))();

server.listen(config.server.port, config.server.host);
console.log(`Running on ${config.server.host}:${config.server.port}`);

app.use('/', express.static(config.publicPath));

app.get('/', function(request, response) {
    response.sendFile(config.publicPath + '/index.html');
})


var connectionsCount = 0;

io.on('connection', function (socket) {

    socket.emit( config.socket.room.exchangesList , exchanges.list );
    socket.emit( config.socket.room.globalExchangesList , globalExchanges.list );

    connectionsCount++;
    io.emit( config.socket.room.connectionsCount , connectionsCount);

    socket.on('disconnect', (reason) => {
        connectionsCount--;
        io.emit( config.socket.room.connectionsCount , connectionsCount);
    });
    
})

setInterval( () => 
        {
            exchanges.broadcastPrices(io,  config.socket.room.exchangesPrice),
            globalExchanges.broadcastPrices(io,  config.socket.room.globalExchangesPrice)
        }
        , config.exchangesUpdateInterval
);