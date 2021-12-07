const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

class NobitexExchange extends BaseExchange {
    
    // https://apidocs.nobitex.ir/#3fe8d57657

    static Data() {
        return {
            name: 'Nobitex',
            link: 'https://cryptopia.ir/go/nobitex-cryptochange',
            logo: 'nobitex81.png',
        }
    }

    static FetchPrice() {

        return axios.post('https://api.nobitex.ir/v2/orderbook', {
            symbol: 'BTCIRT'
        })
        .then((res) => {
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
        let buy = parseInt(Number(data.bids[0][0])/10);
        let sell = parseInt(Number(data.asks[0][0])/10);
        return {
            buy: buy,
            sell: sell
        };
    }

}

module.exports = NobitexExchange