'use strict'

// const goods = [
//     {title: 'Shirt', price: 150},
//     {title: 'Socks', price: 50},
//     {title: 'Jacket', price: 350},
//     {title: 'Shoes', price: 250},
// ];

// const renderGoodsItem = (title = 'title', price = 0) => `<div class="goods-item"><h3 class="goods-title">${title}</h3><p class="price">${price}</p></div>`;

// const renderGoodList = (list) => {
//     let goodsList = list.map(item => renderGoodsItem(item.title, item.price)).join('');
//     document.querySelector('.goods-list').innerHTML = goodsList;
// }

// renderGoodList(goods);

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
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}


// Класс элемента корзины расширяет возможности класса товара,
// теперь у него есть кол-во
class BucketItem extends GoodsItem{
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

const list = new GoodsList();
list.fetchGoods();
list.render();