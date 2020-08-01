// const BaseExchange = require('../BaseExchange.js')

class NobitexExchange extends BaseExchange {
    // https://nobitex.ir/api/
    // static name = 'Nobitex';
    // static link = 'https://cryptopia.ir/go/nobitex'

    updatePrice() {
        this.buy = 190000;
        this.sell = 185000
    }
}

// module.exports = NobitexExchange