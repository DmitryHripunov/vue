import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 1 },
    ],
  },

  mutations: {
    addProductToCart(state, { productId, amount }) {
      const items = state.cartProducts.find((item) => item.productId === productId);

      if (items) {
        items.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },

    updateCartProductAmount(state, { productId, amount }) {
      const items = state.cartProducts.find((item) => item.productId === productId);

      if (items) {
        items.amount = amount;
      }
    },

    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },

    incrementCartProduct(state, { productId, amount }) {
      const items = state.cartProducts.find((item) => item.productId === productId);

      if (items) {
        items.amount = amount + 1;
      }
    },

    decrementCartProduct(state, { productId, amount }) {
      const items = state.cartProducts.find((item) => item.productId === productId);

      if (items && items.amount > 0) {
        items.amount = amount - 1;
      }
    },
  },

  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },

    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => (item.product.price * item.amount) + acc, 0,
      );
    },

    countProducts(state, getters) {
      return getters.cartDetailProducts.length;
    },
  },
});