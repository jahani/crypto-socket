const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

// https://api-docs.wallex.ir
const url = 'https://wallex.ir/api/v2/markets';

class WallexExchange extends BaseExchange {

    static Data() {
        return {
            name: 'Wallex',
            link: 'https://cryptopia.ir/go/wallex',
            logo: 'wallex152.png',
            withdrawFee: 0.0005,
        }
    }

    static FetchPrice() {
        
        return axios.get(url)
        .then((res) => {
            if (res.status != 200) {
                throw (`statusCode: ${res.status}`);
            }

            if (res.data.success != true) {
                throw('Wallex response message status code is not true');
            }

            return this.BestPrice(res.data);
        });

    }

    static FetchVolume() {
        
        return this.FetchPrice();

    }

    static BestPrice(data) {
        let btcStats = data.result.symbols["BTC-TMN"].stats;
        return {
            ask: parseInt(btcStats.askPrice),
            bid: parseInt(btcStats.bidPrice),
            volume: parseInt(btcStats['24h_quoteVolume'])
        };
    }

}

module.exports = WallexExchange