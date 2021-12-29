const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

// https://ramzinex.com/exchange/apidocs/apidoc.html
const url = 'https://ramzinex.com/exchange/api/v1.0/exchange/pairs/2';

class RamzinexExchange extends BaseExchange {

    static Data() {
        return {
            name: 'Ramzinex',
            link: 'https://cryptopia.ir/go/ramzinex',
            logo: 'ramzinex2x.png',
            withdrawFee: 0.00050,
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

    static FetchVolume() {

        return this.FetchPrice();
        
    }

    static BestPrice(data) {
        return {
            ask: parseInt(data.data.sell/10),
            bid: parseInt(data.data.buy/10),
            volume: parseInt(data.data.financial.last24h.quote_volume/10)
        };
    }

}

module.exports = RamzinexExchange