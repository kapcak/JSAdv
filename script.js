const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('goods-list', {
  props: ['goods'],
  template: `
  <div class="goods-list">
    <goods-item v-for="good in goods" :good="good"></goods-item>
  </div>
  `,
});

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item">
      <h3>{{good.product_name}}</h3>
      <p>{{good.price}}</p>
    </div>  
  `,
});

Vue.component('search', {
  data: () => ({
    value: '',
  }),
  template: `
  <div>
    <input type="text" class="goods-search" v-model="value">
    <button class="search-button" type="button" @click="$emit('filter', value)">Искать</button>
  </div>
  `,
});

const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    basketGoods: [],
    isVisibleCart: false,
  },
  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = goods;
      this.filteredGoods = goods;
    });
  },
  methods: {
    makeGETRequest(url, callback) {
      let xhr;

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(JSON.parse(xhr.responseText));
        }
      };

      xhr.open('GET', url, true);
      xhr.send();
    },
    filterGoods(value) {
      const regexp = new RegExp(value, 'i');
      this.filteredGoods = this.goods.filter((good) => regexp.test(good.product_name));
    },
    getBasket() {
      this.makeGETRequest(`${API_URL}/getBasket.json`, (basketGoods) => {
        this.basketGoods = basketGoods;
        isVisibleCart = true;
      });
    },
  },
});

// class GoodsItem {
//   constructor(title, price) {
//     this.title = title;
//     this.price = price;
//   }

//   render() {
// eslint-disable-next-line max-len
//     return `<div class="goods-item"><h3 class="goods-title">${this.title}</h3><p class="price">${this.price}</p></div>`;
//   }
// }

// class GoodsList {
//   constructor() {
//     this.goods = [];
//     this.filteredGoods = [];
//   }

//   fetchGoods() {
//     return new Promise((resolve) => {
//       makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
//         this.goods = JSON.parse(goods);
//         this.filteredGoods = JSON.parse(goods);
//         resolve(this.goods);
//       });
//     });
//   }

//   render() {
//     let listHtml = '';
//     this.filteredGoods.forEach((good) => {
//       const goodItem = new GoodsItem(good.product_name, good.price);
//       listHtml += goodItem.render();
//     });
//     document.querySelector('.goods-list').innerHTML = listHtml;
//   }

//   filterGoods(value) {
//     const regexp = new RegExp(value, 'i');
//     this.filteredGoods = this.goods.filter((good) => regexp.test(good.product_name));
//     this.render();
//   }
// }

// // Класс элемента корзины расширяет возможности класса товара,
// // теперь у него есть кол-во
// class BucketItem extends GoodsItem {
//   constructor(title, price, quantity) {
//     super(title, price);
//     this.quantity = quantity;
//   }

//   render() {
//     return `<div class="goods-item"><h3 class="goods-title">${this.title}</h3><p class="price">${this.price}</p><p class="quantity">${this.quantity}</p></div>`;
//   }

//   position_total() {
//     return this.price * this.quantity;
//   }
// }

// class BucketList {
//   constructor() {
//     this.goodslist = [];
//   }

//   render() { }

//   total_price() {
//     return this.goodslist.reduce((acc, cur) => acc + cur.position_total(), 0);
//   }

//   addItem() {
//     return new Promise((resolve) => {
//       makeGETRequest(`${API_URL}/addToBasket.json`, (goodslist) => {
//         const response = JSON.parse(goodslist);
//         resolve(response);
//       });
//     });
//   }

//   removeItem() {
//     return new Promise((resolve) => {
//       makeGETRequest(`${API_URL}/deleteFromBasket.json`, (goodslist) => {
//         const response = JSON.parse(goodslist);
//         resolve(response);
//       });
//     });
//   }

//   getItems() {
//     return new Promise((resolve) => {
//       makeGETRequest(`${API_URL}/getBasket.json`, (goodslist) => {
//         this.goodslist = JSON.parse(goodslist);
//         resolve(this.goodslist);
//       });
//     });
//   }
// }

// const list = new GoodsList();
// list.fetchGoods().then((goods) => {
//   list.render(goods);
// });
// const basket = new BucketList();
// basket.getItems().then((goodslist) => { console.log(goodslist); });
// basket.removeItem().then((response) => { console.log(response); });
// basket.addItem().then((response) => { console.log(response); });

// const searchButton = document.querySelector('.search-button');
// const searchInput = document.querySelector('.goods-search');

// // searchButton.addEventListener('click', (e) => {
// //   const { value } = searchInput;
// //   list.filterGoods(value);
// // });
