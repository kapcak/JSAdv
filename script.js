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


const list = new GoodsList();
list.fetchGoods();
list.render();