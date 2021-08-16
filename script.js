'use strict'

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3 class="goods-title">${this.title}</h3><p class="price">${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }

    fetchGoods() {
        return new Promise((resolve) => {
            makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
                this.goods = JSON.parse(goods);
                this.filteredGoods = JSON.parse(goods);
                resolve(this.goods)
            })       
        })
    }

    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i')
        this.filteredGoods = this.goods.filter(good => 
            regexp.test(good.product_name));
        this.render()
    }
}



// Класс элемента корзины расширяет возможности класса товара,
// теперь у него есть кол-во
class BucketItem extends GoodsItem {
    constructor(title, price, quantity) {
        super(title, price);
        this.quantity = quantity
    }
    render() {
        return `<div class="goods-item"><h3 class="goods-title">${this.title}</h3><p class="price">${this.price}</p><p class="quantity">${this.quantity}</p></div>`;
    }
    position_total() {
        return this.price * this.quantity
    }
}

class BucketList {
    constructor() {
        this.goodslist = []
    };
    
    render(){};
    
    total_price() {
        return this.goodslist.reduce((acc, cur) => acc + cur.position_total(), 0);
    }

    addItem() {
        return new Promise((resolve) => {
            makeGETRequest(`${API_URL}/addToBasket.json`, (goodslist) => {
                let response = JSON.parse(goodslist);
                resolve(response)
            })       
        })
    };

    removeItem() {
        return new Promise((resolve) => {
            makeGETRequest(`${API_URL}/deleteFromBasket.json`, (goodslist) => {
                let response = JSON.parse(goodslist);
                resolve(response)
            })       
        })
    };

    getItems() {
        return new Promise((resolve) => {
            makeGETRequest(`${API_URL}/getBasket.json`, (goodslist) => {
                this.goodslist = JSON.parse(goodslist);
                resolve(this.goodslist)
            })       
        })
    };
}


function makeGETRequest(url, callback) {
    var xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}

const list = new GoodsList();
list.fetchGoods().then((goods) => {
    list.render(goods);
});

const basket = new BucketList();
basket.getItems().then((goodslist) => { console.log(goodslist) })
basket.removeItem().then((response) => { console.log(response) })
basket.addItem().then((response) => { console.log(response) })

const searchButton = document.querySelector('.search-button')
const searchInput = document.querySelector('.goods-search')

searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
});