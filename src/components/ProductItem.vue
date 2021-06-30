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

    <ul class="colors colors--black">
      <li class="colors__item"
        v-for="color in product.colors" :key="color.id"
      >
        <label class="colors__label">
          <input
          class="colors__radio sr-only"
          type="radio"
          v-model="colorChosen"
          :value="color.id">

          <span class="colors__value"
          :style="{'background-color': color.color.code}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      // currentCheckedColor: null,
    };
  },
  props: ['product', 'colorChecked'],

  filters: {
    numberFormat,
  },
  watch: {
    colorChecked(value) {
      this.currentCheckedColor = value;
    },
  },
  computed: {
    colorChosen: {
      get() {
        return this.colorChecked;
      },
      set(value) {
        this.$emit('update:colorChecked', value);
      },
    },
  },
};
</script>
