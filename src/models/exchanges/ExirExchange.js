const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

class ExirExchange extends BaseExchange {

    // https://apidocs.exir.io/#orderbook

    static Data() {
        return {
            name: 'Exir',
            link: 'https://cryptopia.ir/go/exir',
            logo: 'exir192.png',
        }
    }

    static FetchPrice() {
        
        return axios.get('https://api.exir.io/v1/orderbooks?symbol=btc-irt')
        .then((res) => {
            if (res.status != 200) {
                throw (`statusCode: ${res.status}`);
            }

            return this.BestPrice(res.data);
        });

    }

    static BestPrice(data) {
        let ask = parseInt(data['btc-irt'].asks[0][0]);
        let bid = parseInt(data['btc-irt'].bids[0][0]);
        return {
            ask: ask,
            bid: bid
        };
    }

}

module.exports = ExirExchange