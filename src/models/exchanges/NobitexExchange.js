const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');

// https://apidocs.nobitex.ir/#3fe8d57657
const priceURL = 'https://api.nobitex.ir/v2/orderbook/BTCIRT';
const volumeURL = 'https://api.nobitex.ir/market/stats';


class NobitexExchange extends BaseExchange {
    
    static Data() {
        return {
            name: 'Nobitex',
            link: 'https://cryptopia.ir/go/nobitex-cryptochange',
            logo: 'nobitex81.png',
            lightning: true,
            withdrawFee: 0.00035,
        }
    }

    static FetchPrice() {

        return axios.get(priceURL)
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

    static FetchVolume() {

        return axios.post(volumeURL, {
            srcCurrency: 'btc',
            dstCurrency: 'rls'
        })
        .then((res) => {
            if (res.status != 200) {
                throw (`statusCode: ${res.status}`);
            }
            if (res.data.status !== 'ok') {
                throw (`status: ${res.data.status}`)
            }

            return {
                volume: this.FormatPrice(res.data.stats['btc-rls'].volumeDst)
            };
        });

    }
    
    static BestPrice(data) {
        return {
            ask: this.FormatPrice(data.bids[0][0]),
            bid: this.FormatPrice(data.asks[0][0])
        };
    }

    static FormatPrice(price) {
        return parseInt(Number(price)/10);
    }

}

module.exports = NobitexExchange