const BASE_URL = "https://mock-api-builder.vercel.app/api/schema/get";

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
