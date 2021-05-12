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
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            {title: 'Shirt', price: 150},
            {title: 'Socks', price: 50},
            {title: 'Jacket', price: 350},
            {title: 'Shoes', price: 250},
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new CartItem(good.title, good.price);
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
        this.products = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    render() {
        const productsList = this.products
            .map(item => new ProductItem(item.title, item.price, item.img)
                .render());
        document.querySelector('.products').innerHTML = productsList.join('');
    }
}


const renderPage = () => {
    let cart = new CartList();
    cart.fetchGoods();
    cart.render();

    let products = new ProductList();
    products.render();
};

renderPage();