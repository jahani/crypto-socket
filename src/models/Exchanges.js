const glob = require( 'glob' );
const path = require( 'path' );

// Constant Variables
const exchangesPathPattern = path.join(__dirname, 'exchanges/*Exchange.js');

class Exchanges {

    constructor() {
        this.classes = this.constructor.GetClasses();
        this.list = this.constructor.GetData( this.classes );
    }

    // Broadcast prices
    broadcastPrices(io, room) {

        this.broadcastCustomMethod(io, room, 'FetchPrice');
    
    }

    // Broadcast volumes
    broadcastVolumes(io, room) {

        this.broadcastCustomMethod(io, room, 'FetchVolume');
    
    }

    // Fetch and broadcast exchanges defined method output over socket.io server instance
    broadcastCustomMethod(io, room, method) {

        for (let key = 0; key < this.classes.length; key++) {
            let Exchange = this.classes[key];
            
            try {
                Exchange[method]().then(data => {
                    io.emit(room, [
                        {...{id: key}, ...data}
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