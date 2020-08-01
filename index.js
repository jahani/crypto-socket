var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// var glob = require( 'glob' );
// var path = require( 'path' );
// var classes = {}
// require('./models/BaseExchange.js');
// glob.sync( './models/exchanges/*Exchange.js' ).forEach( function( file ) {
//     let className = file.split('/').pop().replace('.js','');
//     // classes.push( className )
//     classes[className] = require( path.resolve( file ) );
//     // console.log(  );
// });
// var exchanges = [];

server.listen(3000);

app.use('/', express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
})

io.on('connection', function (socket) {
    
    io.emit('exchanges.list', [
        {id: 1, name: 'Nobitex', link: 'https://cryptopia.ir/go/nobitex'},
        {id: 2, name: 'Exir', link: 'https://cryptopia.ir/go/exir'},
    ]);

})

function priceUpdate() {
    io.emit('exchanges.price', [
        {id: randInt(1,2), buy: randInt(10000, 20000), sell: randInt(5000, 10000)}
    ]);
}

setInterval(() => priceUpdate(), 1000);


function randInt(min, max) {
    return parseInt((Math.random() * (max - min + 1)), 10) + min;
}
