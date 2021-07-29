const BASE_URL = "https://mock-api-builder.vercel.app/api/schema/get";

Vue.component("app-good", {
  props: ["good"],
  template: `
    <div class="goods-item">
      <h3>{{ good.productName }}</h3>
      <span>{{ good.price }}</span>
      <button @click="$emit('add-to-cart')">add to cart 🛒</button>
    </div>
  `,
});

Vue.component("app-cart", {
  props: ["good"],
  template: `
  <div class="goods-item">
      <h3>{{ good.productName }}</h3>
      <span>{{ good.price }}$</span>
      <span>there are {{ good.quantity }} items</span>
      <button @click="$emit('remove-from-cart', good)">remove from cart 🛒</button>
  </div>
  `,
});

Vue.component("app-goods-list", {
  props: ["goods"],
  template: `
    <div>
      <div v-if="goods.length == 0">
        <h3>Нет данных</h3>
      </div>
      <div v-else data-id="goods">
        <app-good :good="good" @add-to-cart="$emit('add-to-cart', good)" v-for="good in goods"></app-good>
      </div>
    </div>
  `,
});

Vue.component("app-search", {
  template: `
    <div>
      <input type="search" placeholder="Search" @change="e => $emit('change', e.target.value)">
      <button @click="$emit('click')">Искать</button>
    </div>
  `,
});

const app = new Vue({
  el: "#root",
  data: {
    goods: [],
    searchGoods: "",
    filteredGoods: [],
    cartGoods: [],
    showCart: false,
  },
  methods: {
    getGoods() {
      fetch(`${BASE_URL}/602c166a89c4a60009ef7046`)
        .then((r) => r.json())
        .then((r) => {
          this.goods = r;
          this.filteredGoods = this.goods;
        })
        .catch((e) => {
          this.errorMessage = e;
        });
    },

    toggleCart() {
      this.showCart = !this.showCart;
    },

    addToCart(item) {
      let inCart = false;

      for (const cartGood of this.cartGoods) {
        if (cartGood.id === item.id) {
          inCart = true;
          cartGood.quantity += 1;
          break;
        }
      }

      if (!inCart) {
        this.cartGoods.push({ ...item, quantity: 1 });
      }
    },

    removeFromCart(item) {
      for (let i = 0; i < this.cartGoods.length; i++) {
        if (this.cartGoods[i].id === item.id) {
          this.cartGoods[i].quantity -= 1;
          if (this.cartGoods[i].quantity === 0) {
            this.cartGoods.splice(i, 1);
          }
          break;
        }
      }
      // const cartGood = this.cartGoods.find(good => good.id === item.id);
      // cartGood.quantity--;
      // if (!cartGood.quantity) {
      //   this.cartGoods = this.cartGoods.filter(good => good.id !== item.id)
      // }
    },

    filterGoods() {
      if (!this.goods.length) {
        this.filteredGoods = [];
      }

      if (!this.searchGoods) {
        this.filteredGoods = this.goods;
      }

      this.filteredGoods = this.goods.filter((i) =>
        i.productName.toLowerCase().includes(this.searchGoods.toLowerCase())
      );
    },
  },

  mounted() {
    this.getGoods();
  },
});
