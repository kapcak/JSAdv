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
  methods: {
    addItem() {
      app.addToCart(this.good);
    },
  },
  template: `
    <div class="goods-item" @click="addItem">
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

Vue.component('basket', {
  props: ['isvisiblecart', 'basketgoods', 'good'],
  template: `
  <div class="goods-list">
    <basket-item v-for="item in basketgoods" :good="item"></basket-item>
  </div>`,
});

Vue.component('basket-item', {
  props: ['good'],
  methods: {
    deleteitem() {
      app.deleteFromCart(this.good);
    },
  },
  template: `
  <div class="goods-item" @click="deleteitem">
    <h3 class="goods-title">{{good.product_name}}</h3>
    <p class="price">{{good.price}}</p>
  </div>`,
});

const app = new Vue({
  el: '#app',
  data: {
    good: {},
    goods: [],
    filteredGoods: [],
    basketGoods: [],
    isVisibleCart: true,
  },
  mounted() {
    this.makeGETRequest('/catalogData').then((goods) => {
      this.goods = goods;
      this.filteredGoods = goods;
    });
  },
  methods: {
    async makeGETRequest(url) {
      const response = await fetch(url);
      return response.json();
    },
    async makePOSTRequest(url, data) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    filterGoods(value) {
      const regexp = new RegExp(value, 'i');
      this.filteredGoods = this.goods.filter((good) => regexp.test(good.product_name));
    },
    getBasket() {
      this.makeGETRequest('/getBasket').then((basketGoods) => {
        this.basketGoods = basketGoods;
        console.log(this.basketGoods);
        this.isVisibleCart = true;
      });
    },
    addToCart(good) {
      this.makePOSTRequest('/addToCart', good)
        .then((res) => console.log(res));
      this.getBasket()
        .then(console.log(this.basketGoods));
    },
    deleteFromCart(good) {
      this.makePOSTRequest('/deleteFromCart', good)
        .then((res) => console.log(this.basketGoods));
      this.getBasket()
        .then(console.log(this.basketGoods));
    },
  },
});
