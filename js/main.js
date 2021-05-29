const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        imgCart: 'https://placehold.it/50x100',
        products: [],
        imgProduct: 'https://placehold.it/200x150',
        apiErrors: ['111', '222', '333']
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.apiErrors.push(error)
                })
        },
        addProduct(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({quantity: 1}, item);
                            this.cartItems.push(prod)
                        }
                    }
                }).catch(error => {
                this.apiErrors.push(error)
            })
        },
        remove(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                }).catch(error => {
                this.apiErrors.push(error)
            })
        },
        closeMessage(message) {
            console.log(this.apiErrors);
            console.log(message);
            this.apiErrors = this.apiErrors.filter(m => m != message);
        },
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.$data.cartItems.push(item);
                }
            }).catch(error => {
            this.apiErrors.push(error)
        });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            }).catch(error => {
            this.apiErrors.push(error)
        });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            }).catch(error => {
            this.apiErrors.push(error)
        })
    }

});