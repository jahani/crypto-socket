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

    static BestPrice(data) {
        let priceData = data.result.symbols["BTC-TMN"].stats;
        let buy = parseInt(priceData.askPrice);
        let sell = parseInt(priceData.bidPrice);
        return {
            buy: buy,
            sell: sell
        };
    }

}

module.exports = WallexExchange