const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');
const $ = require('cheerio');
const url = 'https://wallex.ir/markets/btc-tmn';

class WallexExchange extends BaseExchange {
    
    static Data() {
        return {
            name: 'Wallex',
            link: 'https://cryptopia.ir/go/wallex',
            logo: 'wallex152.png',
        }
    }

    static FetchPrice() {

        return axios.get(url, { headers: {
            'pragma': 'no-cache',
            'dnt': '1',
            'accept-encoding': 'gzip, deflate',
            'accept-language': 'en,en-US;q=0.9,fa;q=0.8,tr;q=0.7',
            'upgrade-insecure-requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'cache-control': 'no-cache',
            'authority': 'wallex.ir',
        }  })
        .then((res) => {
            if (res.status != 200) {
                throw (`statusCode: ${res.status}`);
            }
            let html = res.data;
            let buy = $('#sellers-table > tbody > tr:nth-child(1) > td:nth-child(2)', html).text();
            let sell = $('#buyers-table > tbody > tr:nth-child(1) > td:nth-child(2)', html).text();

            buy = buy.trim().split(',').join('');
            sell = sell.trim().split(',').join('');

            return {
                buy: parseInt(buy),
                sell: parseInt(sell)
            };
        });

    }

}

module.exports = WallexExchange