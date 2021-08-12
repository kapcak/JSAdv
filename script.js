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
    }

    fetchGoods() {
        return new Promise((resolve) => {
            makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
                this.goods = JSON.parse(goods);
                resolve(this.goods)
            })       
        })
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
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
    fetchItems(){
        this.goodslist = [
            new BucketItem('Shirt', 150, 10),
            new BucketItem('Socks', 50, 15),
            new BucketItem('Jacket', 350, 4),
            new BucketItem('Shoes', 250, 12),
        ];
    };
    render(){};
    total_price() {
        return this.goodslist.reduce((acc, cur) => acc + cur.position_total(), 0);
    }
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