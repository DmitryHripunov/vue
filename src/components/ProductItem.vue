<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <picture>
        <img :src="product.image"
             :alt="product.title">
      </picture>
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ProductFilterColors
      :colors="product.colors"
      :color-checked.sync="currentCheckedColor"
    />
  </li>
</template>

<script>
import ProductFilterColors from '@/components/ProductFilterColors.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      currentCheckedColor: 0,
    };
  },
  props: ['product'],
  components: { ProductFilterColors },
  filters: {
    numberFormat,
  },
  watch: {
    colorChecked(value) {
      this.currentCheckedColor = value;
    },
  },
};
</script>
