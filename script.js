'use strict'

const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];

const renderGoodsItem = (title = 'title', price = 0) => `<div class="goods-item"><h3 class="goods-title">${title}</h3><p class="price">${price}</p></div>`;

const renderGoodList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price)).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodList(goods);