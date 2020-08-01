class BaseExchange {

    static getData() {
        return {name: self.name, link: self.link}
    }

    static getPrice() {
        self.updatePrice();
        return {buy: self.buy, sell: self.sell};
    }

    static updatePrice() {} // to override
}

// module.exports = BaseExchange