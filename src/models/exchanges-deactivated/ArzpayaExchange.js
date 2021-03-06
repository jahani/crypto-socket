const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

class ArzpayaExchange extends BaseExchange {

    // https://arzpaya.com/Home/Api/

    static Data() {
        return {
            name: 'Arzpaya',
            link: 'https://cryptopia.ir/go/arzpaya',
            logo: 'arzpaya.jpg',
        }
    }

    static FetchPrice() {
        
        return axios.get('https://api.arzpaya.com/Public/GetPrice')
        .then((res) => {
            if (res.status != 200) {
                throw (`statusCode: ${res.status}`);
            }

            return this.BestPrice(res.data);
        });

    }

    static BestPrice(data) {
        let ask = parseInt(data.BTCIR.SellPrice);
        let bid = parseInt(data.BTCIR.BuyPrice);
        return {
            ask: ask,
            bid: bid
        };
    }

}

module.exports = ArzpayaExchange