const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

class RamzinexExchange extends BaseExchange {

    // https://ramzinex.com/exchange/apikeys/guide

    static Data() {
        return {
            name: 'Ramzinex',
            link: 'https://cryptopia.ir/go/ramzinex',
            logo: 'ramzinex2x.png',
        }
    }

    static FetchPrice() {
        
        return axios.get('https://ramzinex.com/exchange/api/exchange/prices')
        .then((res) => {
            if (res.status != 200) {
                throw (`statusCode: ${res.status}`);
            }

            return this.BestPrice(res.data);
        });

    }

    static BestPrice(data) {
        let buy = parseInt(data.original.btcirr.sell/10);
        let sell = parseInt(data.original.btcirr.buy/10);
        return {
            buy: buy,
            sell: sell
        };
    }

}

module.exports = RamzinexExchange