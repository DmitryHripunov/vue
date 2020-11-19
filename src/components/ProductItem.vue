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

    <ul class="colors colors--black" v-if="product.colors">
      <li class="colors__item" v-for="(color, index) in product.colors" :key="index">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio"
             :value="color.code"
          >
          <span class="colors__value" :style="{'background-color':color.code }">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],

  filters: {
    numberFormat,
  },
};
</script>
