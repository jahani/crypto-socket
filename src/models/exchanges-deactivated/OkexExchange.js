const BaseExchange = require('../BaseExchange.js')

const axios = require('axios');
const fetch = require('node-fetch');
const $ = require('cheerio');
const url = 'https://ok-ex.io/trade/BTC_IRT';

class OkexExchange extends BaseExchange {
    
    static Data() {
        return {
            name: 'Ok Ex',
            link: 'https://cryptopia.ir/go/okex',
            logo: 'okex152.png',
        }
    }

    static FetchPrice() {

        return fetch(url, { headers: {
            'pragma': 'no-cache',
            'dnt': '1',
            'accept-encoding': 'gzip, deflate',
            'accept-language': 'en-US,en;q=0.9',
            'upgrade-insecure-requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'cache-control': 'no-cache',
            'authority': 'ok-ex.io',
        }  })
        .then(res => res.text())
        .then((html) => {
            
            console.log(html);
            let ask = $('#intro-step-3 > a:nth-child(1) > div:nth-child(2) > span', html).text();
            let bid = $('#intro-step-4 > a:nth-child(1) > div:nth-child(2) > span', html).text();

            ask = ask.trim().split(',').join('');
            bid = bid.trim().split(',').join('');

            return {
                ask: parseInt(ask),
                bid: parseInt(bid)
            };
        });

    }

}

module.exports = OkexExchange