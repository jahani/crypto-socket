const glob = require( 'glob' );
const path = require( 'path' );

// Constant Variables
const exchangesPathPattern = './models/exchanges/*Exchange.js';

class Exchanges {

    constructor() {
        this.classes = this.constructor.GetClasses();
        this.list = this.constructor.GetData( this.classes );
    }

    // Fetch and broadcast prices over socket.io server instance
    broadcastPrices(io, room) {

        for (let key = 0; key < this.classes.length; key++) {
            let Exchange = this.classes[key];
            
            try {
                Exchange.FetchPrice().then(prices => {
                    io.emit(room, [
                        {...{id: key}, ...prices}
                    ]);
                });
            } catch (error) {
                console.error(error);
            }
        }
    
    }
    
    static GetData(exchangeClasses) {
        let exchanges = []
        for (let key = 0; key < exchangeClasses.length; key++) {
            let Exchange = exchangeClasses[key];
            exchanges.push( {...{id: key}, ...Exchange.Data()} );
        }
        return exchanges;
    }

    // Autoload and get all exchange classes
    static GetClasses() {
        let classes = [];
        glob.sync( exchangesPathPattern ).forEach( function( file ) {
            // let exchangeName = file.split('/').pop().replace('.js','');
            classes.push( require(path.resolve( file )) );
        });
        return classes;
    }

}

module.exports = Exchanges