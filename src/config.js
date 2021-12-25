module.exports = {

    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000
    },

    publicPath: __dirname + '/../public',

    // Exchanges data update interval (miliseconds)
    exchangesUpdateInterval: 3100,

    // Shared socket messages pattern
    socket: {
        room: {
            exchangesList: 'exchanges.list',
            exchangesPrice: 'exchanges.price',
            connectionsCount: 'connections.count',
        }
    }
    
}