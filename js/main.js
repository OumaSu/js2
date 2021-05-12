const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
const renderProduct = (title, price, img) =>
    `<div class="product-item">
                <img src={img} alt='no_img'>
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`;

const renderPage = (list = []) => {
    const productsList = list.map(item => renderProduct(item.title, item.price));
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);