class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    async convertToCurrency(currency) {
        try {
            const currencyApi = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=381b6a80-8059-11ec-9351-cb56f1982e46');
            const currJson = await currencyApi.json();
            const currData = await currJson.data;
            console.log(currData);
            for (let key in currData) {
                if (currency == key) {
                    currData[key]; // why currData.currency or currData.key return the undefined value?
                    const result = this.price * currData[key];
                    console.log(Math.floor(result));;
                }
            }
        } catch (error) {
            return error
        }
    }
}

class ShoppingCart {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
        return this.products;
    }

    removeProduct(product) {
        const pIndex = this.products.indexOf(product);
        this.products.splice(pIndex, 1);
        return this.products
    }

    searchProduct(productName) {
        const result = this.products.filter(value => productName !== value.name)
        return result
    }

    getTotal() {
        const totalValue = this.products.reduce((pValue, cValue) =>
            pValue + cValue.price
            , 0);
        return totalValue;
    }

    async renderProducts() {
        const productDiv = document.getElementById('product');
        productDiv.innerHTML = '';
        let user = await this.getUser(2);
        productDiv.appendChild(document.createElement('p')).innerHTML = `User name: ${user.name}`;
        for (let value of this.products) {
            const mainDiv = document.createElement('div');
            productDiv.appendChild(mainDiv);
            mainDiv.appendChild(document.createElement('p')).innerHTML = value.name;
            mainDiv.appendChild(document.createElement('p')).innerHTML = value.price;
        }
        const totalDiv = document.createElement('div');
        productDiv.appendChild(totalDiv);
        totalDiv.appendChild(document.createElement('p')).innerHTML = `Total price: ${this.getTotal()}`;
    }

    async getUser(user) {
        const url = (`https://jsonplaceholder.typicode.com/users/${user}`);
        try {
            let userApi = await fetch(url);
            return await userApi.json();
        } catch (error) {
            return error
        }
    }
}

const shoppingCart = new ShoppingCart();
const flatscreen = new Product("flat-screen", 5000);
const bag = new Product("bag", 1000);
console.log(shoppingCart.addProduct(flatscreen));;
console.log(shoppingCart.addProduct(bag));
console.log(shoppingCart.removeProduct(bag));
console.log(shoppingCart.addProduct(bag));;
console.log(shoppingCart.getTotal());
console.log(shoppingCart.searchProduct("bag"));
//console.log(shoppingCart.getUser(2));
//shoppingCart.getUser(2)
shoppingCart.renderProducts();
bag.convertToCurrency('DKK');