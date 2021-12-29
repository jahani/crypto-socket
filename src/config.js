module.exports = {

    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000
    },

    publicPath: __dirname + '/../public',

    // Exchanges data update interval (miliseconds)
    intervals: {
        price: 3100,
        volume: 9050,
    },

    // Shared socket messages pattern
    socket: {
        room: {
            exchangesList: 'exchanges.list',
            exchangesPrice: 'exchanges.price',
            exchangesVolume: 'exchanges.volume',
            globalExchangesList: 'globalExchanges.list',
            globalExchangesPrice: 'globalExchanges.price',
            connectionsCount: 'connections.count',
        }
    }
    
}