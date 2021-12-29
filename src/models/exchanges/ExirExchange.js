const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

// https://apidocs.exir.io/#orderbook
const url = 'https://api.exir.io/v1/orderbooks?symbol=btc-irt';

class ExirExchange extends BaseExchange {

    static Data() {
        return {
            name: 'Exir',
            link: 'https://cryptopia.ir/go/exir',
            logo: 'exir192.png',
        }
    }

    static FetchPrice() {
        
        return axios.get(url)
        .then((res) => {
            if (res.status != 200) {
                throw (`statusCode: ${res.status}`);
            }

            return this.BestPrice(res.data);
        });

    }

    static BestPrice(data) {
        return {
            ask: parseInt(data['btc-irt'].asks[0][0]),
            bid: parseInt(data['btc-irt'].bids[0][0])
        };
    }

}

module.exports = ExirExchange