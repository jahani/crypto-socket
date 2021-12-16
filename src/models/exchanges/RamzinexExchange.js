const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

const url = 'https://ramzinex.com/exchange/api/v1.0/exchange/pairs/2';

class RamzinexExchange extends BaseExchange {

    // https://ramzinex.com/exchange/apidocs/apidoc.html

    static Data() {
        return {
            name: 'Ramzinex',
            link: 'https://cryptopia.ir/go/ramzinex',
            logo: 'ramzinex2x.png',
        }
    }

    static FetchPrice() {
        
        return axios.get(url)
        .then((res) => {
            if (res.status != 200) {
                throw (`statusCode: ${res.status}`);
            }

            if (res.data.status != 0) {
                throw('Ramizex response message status code is not zero');
            }

            return this.BestPrice(res.data);
        });

    }

    static BestPrice(data) {
        let buy = parseInt(data.data.sell/10);
        let sell = parseInt(data.data.buy/10);
        return {
            buy: buy,
            sell: sell
        };
    }

}

module.exports = RamzinexExchange