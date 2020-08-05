const BaseExchange = require('../BaseExchange.js')

class ExirExchange extends BaseExchange {
    // https://apidocs.exir.io/
    // static name = 'Exir';
    // static link = 'https://cryptopia.ir/go/exir'

    static Data() {
        return {
            name: 'Exir',
            link: 'https://cryptopia.ir/go/exir'
        }
    }

    static FetchPrice() {
        return FetchPriceHelper();   
    }
}

async function FetchPriceHelper() {
    return {
        buy: randInt(500, 599),
        sell: randInt(400,499)
    }
}

function randInt(min, max) {
    return parseInt((Math.random() * (max - min + 1)), 10) + min;
}

module.exports = ExirExchange