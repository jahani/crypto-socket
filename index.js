var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

var exchanges = new (require('./models/Exchanges.js'))();

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

app.use('/', express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
})


io.on('connection', function (socket) {

    io.emit('exchanges.list', exchanges.list );

})

setInterval(() => exchanges.broadcastPrices(io, 'exchanges.price'), 3100);

