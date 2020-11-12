<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <picture>
        <img :src="currentProductImg"
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

    <ul class="colors colors--black" v-if="product.colors">
      <ProductColorsIgm
        v-for="(color, index) in product.colors" :key=index :color="color"
        :color-checked.sync="currentCheckedColor"
      />
    </ul>
  </li>
</template>

<script>
import ProductColorsIgm from '@/components/ProductColorsIgm.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  components: { ProductColorsIgm },
  props: ['product'],
  filters: {
    numberFormat,
  },
  data() {
    return {
      currentCheckedColor: 0,
    };
  },

  computed: {
    currentProductImg() {
      const checkedColor = this.currentCheckedColor;
      if (this.product.colors) {
        if (checkedColor && checkedColor === this.product.colors[0].value) {
          return this.product.colors[0].image;
        }
        if (checkedColor && checkedColor === this.product.colors[1].value) {
          return this.product.colors[1].image;
        }
        if (checkedColor && checkedColor === this.product.colors[2].value) {
          return this.product.colors[2].image;
        }
      }
      return this.product.image;
    },
  },
};
</script>
