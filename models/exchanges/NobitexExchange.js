const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

class NobitexExchange extends BaseExchange {
    // https://apidocs.nobitex.ir/#3fe8d57657
    // https://nobitex.ir/api/
    // static name = 'Nobitex';
    // static link = 'https://cryptopia.ir/go/nobitex'

    static Data() {
        return {
            name: 'Nobitex',
            link: 'https://cryptopia.ir/go/nobitex'
        }
    }

    static FetchPrice() {

        return axios.post('https://api.nobitex.ir/v2/orderbook', {
            symbol: 'BTCIRT'
        })
        .then((res) => {
            // console.log(res);
            // return {
            //     buy: 200000,
            //     sell: 100000
            // }
            if (res.status != 200) {
                throw (`statusCode: ${res.status}`);
            }
            if (res.data.status !== 'ok') {
                throw (`status: ${res.data.status}`)
            }

            return this.BestPrice(res.data);
        });

    }
    
    static BestPrice(data) {
        let buy = parseInt(data.bids[0][0]);
        let sell = parseInt(data.asks[0][0]);
        return {
            buy: buy,
            sell: sell
        };
    }

}

module.exports = NobitexExchange