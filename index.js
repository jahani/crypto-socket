var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// Autoload Exchanges
var glob = require( 'glob' );
var path = require( 'path' );
var exchangeClasses = [];
glob.sync( './models/exchanges/*Exchange.js' ).forEach( function( file ) {
    // let exchangeName = file.split('/').pop().replace('.js','');
    exchangeClasses.push( require(path.resolve( file )) );
});

const exchanges = getExchangesData(exchangeClasses);

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

app.use('/', express.static(__dirname + '/public'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/public/index.html');
})


io.on('connection', function (socket) {

    io.emit('exchanges.list', exchanges );

})

setInterval(() => priceUpdate(), 3100);
function priceUpdate() {

    for (let key = 0; key < exchangeClasses.length; key++) {
        const Exchange = exchangeClasses[key];
        
        try {
            Exchange.FetchPrice().then(prices => {
                io.emit('exchanges.price', [
                    {...{id: key}, ...prices}
                ]);
            });
        } catch (error) {
            console.error(error);
        }
    }

}


function getExchangesData(exchangeClasses) {
    let exchanges = []
    for (let key = 0; key < exchangeClasses.length; key++) {
        const Exchange = exchangeClasses[key];
        exchanges.push( {...{id: key}, ...Exchange.Data()} );
    }
    return exchanges;
}