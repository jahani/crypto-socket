const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

class BinanceExchange extends BaseExchange {

    // https://binance-docs.github.io/apidocs/spot/en/#symbol-price-ticker

    static Data() {
        return {
            name: 'Binance',
            link: '',
            logo: '',
        }
    }

    static FetchPrice() {
        
        return axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
        // {"symbol":"BTCUSDT","price":"50015.93000000"}
        .then((res) => {
            if (res.status != 200) {
                throw (`statusCode: ${res.status}`);
            }

            return {
                price: res.data.price,
            };
        });

    }

}

module.exports = BinanceExchange