const BaseExchange = require('../BaseExchange.js')

class ExirExchange extends BaseExchange {
    // https://apidocs.exir.io/
    // static name = 'Exir';
    // static link = 'https://cryptopia.ir/go/exir'

    updatePrice() {
        this.buy = 270000;
        this.sell = 194000
    }
}

// module.exports = ExirExchange