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

    <div class="product__counter form__counter">
      <ProductDecrement :item.sync="item" />

      <input type="text" v-model.number="amount" name="count">

      <ProductIncrement :item.sync="item"/>
    </div>

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>

    <button
      class="product__del button-del" type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';
import ProductIncrement from '@/components/ProductIncrement.vue';
import ProductDecrement from '@/components/ProductDecrement.vue';

export default {
  components: { ProductIncrement, ProductDecrement },
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
        return this.$store.commit('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
  },
};
</script>
