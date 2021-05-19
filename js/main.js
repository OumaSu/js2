const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const catalogData = '/catalogData.json';
const getBasket = '/getBasket.json';
const addToBasket = '/addToBasket.json';
const deleteFromBasket = '/deleteFromBasket.json';

function makeRequest(url, action, callback) {
    let xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}


class BaseItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}

class CartItem extends BaseItem {
    constructor(title, price) {
        super(title, price);
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class ProductItem extends BaseItem {
    constructor(title, price, img) {
        super(title, price);
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                <img src={this.img} alt='no_img'>
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;
    }
}

class CartList {
    constructor() {
        this.goods = {};
    }

    fetchGoods(callback) {
        // this.goods = [
        //     {title: 'Shirt', price: 150},
        //     {title: 'Socks', price: 50},
        //     {title: 'Jacket', price: 350},
        //     {title: 'Shoes', price: 250},
        // ];
        makeRequest(API + getBasket, 'GET',
            response => {
                this.goods = JSON.parse(response)
                callback();
            }
        )
    }

    render() {
        let listHtml = '';
        console.log(this);
        this.goods.contents.forEach(good => {
            const goodItem = new CartItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    getTotalSum() {
        return this.goods.reduce((total, curr) => total + curr.price, 0)
    }
}

class ProductList {
    constructor() {
        // this.products = [
        //     {id: 1, title: 'Notebook', price: 2000},
        //     {id: 2, title: 'Mouse', price: 20},
        //     {id: 3, title: 'Keyboard', price: 200},
        //     {id: 4, title: 'Gamepad', price: 50},
        // ];
    }

    getProducts(callback) {
        makeRequest(API + catalogData, 'GET',
            (request => {
                this.products = JSON.parse(request)
                callback()
            }))
    }

    render() {
        const productsList = this.products
            .map(item => new ProductItem(item.product_name, item.price, item.img)
                .render());
        document.querySelector('.products').innerHTML = productsList.join('');
    }
}


const renderPage = () => {
    let cart = new CartList();
    cart.fetchGoods(() => cart.render());

    let products = new ProductList();
    products.getProducts(() => products.render());
};

renderPage();