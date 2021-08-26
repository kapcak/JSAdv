Vue.component('goods-list', {
  props: ['goods'],
  template: `
  <div class="goods-list">
    <goods-item v-for="(good, index) in goods" :good="good" :key="index"></goods-item>
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
  props: ['basketgoods', 'good'],
  template: `
  <div class="goods-list">
    <basket-item v-for="(item, index) in basketgoods" :good="item" :key="index"></basket-item>
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
      if (!response.ok) {
        throw new Error(`ERROR.Response status: ${response.statusText}`);
      }
      const resultJson = response.json();
      return resultJson;
    },
    async makePOSTRequest(url, data) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`ERROR.Response status: ${response.statusText}`);
      }
      const resultJson = response.json();
      return resultJson;
    },
    filterGoods(value) {
      const regexp = new RegExp(value, 'i');
      this.filteredGoods = this.goods.filter((good) => regexp.test(good.product_name));
    },
    getBasket() {
      this.makeGETRequest('/getBasket').then((basketGoods) => {
        this.basketGoods = basketGoods;
      });
    },
    addToCart(good) {
      this.makePOSTRequest('/addToCart', good)
        .then(() => setTimeout(app.getBasket(), 100))
        .catch(console.error());
    },
    deleteFromCart(good) {
      this.makePOSTRequest('/deleteFromCart', good)
        .then(() => setTimeout(app.getBasket(), 100))
        .catch(console.error());
    },
  },
});
