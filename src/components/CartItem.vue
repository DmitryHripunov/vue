<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image"
           width="120" height="120"
           alt="item.product.title"
      >
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>

    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <Counter :amount.sync="amount" />

    <b class="product__price">
      {{ (amount * item.product.price) | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del" type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
// import { mapActions } from 'vuex';
import Counter from '@/components/Counter.vue';

export default {
  components: { Counter },
  filters: {
    numberFormat,
  },

  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        return this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    // ...mapActions(['deleteProductFromCart']),
    deleteProduct() {
      this.$store.dispatch('deleteProductFromCart', { productId: this.item.productId });
      // this.deleteProductFromCart({ productId: this.item.productId });
    },
  },
};
</script>
