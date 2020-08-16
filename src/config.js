module.exports = {

    server: {
        host: '0.0.0.0',
        port: process.env.PORT || 3000
    },

    publicPath: __dirname + '/../public',

    // Shared socket messages pattern
    socket: {
        room: {
            exchangesList: 'exchanges.list',
            exchangesPrice: 'exchanges.price',
            connectionsCount: 'connections.count',
        }
    }
    
}