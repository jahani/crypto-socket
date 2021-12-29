const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

// https://apidocs.nobitex.ir/#3fe8d57657
const url = 'https://api.nobitex.ir/v2/orderbook/BTCIRT';


class NobitexExchange extends BaseExchange {
    
    static Data() {
        return {
            name: 'Nobitex',
            link: 'https://cryptopia.ir/go/nobitex-cryptochange',
            logo: 'nobitex81.png',
        }
    }

    static FetchPrice() {

        return axios.get(url)
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
        let ask = parseInt(Number(data.bids[0][0])/10);
        let bid = parseInt(Number(data.asks[0][0])/10);
        return {
            ask: ask,
            bid: bid
        };
    }

}

module.exports = NobitexExchange