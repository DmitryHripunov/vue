<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" >
      <picture>
        <img :src="currentProductImg"
             :alt="product.title">
      </picture>
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>

    <ul class="colors colors--black" v-if="product.colors">
      <li class="colors__item"  v-for="(color, index) in product.colors" :key=index>
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio"
          :value="color.value" v-model="currentCheckedColor">
          <span class="colors__value" :style="{'background-color':color.value }">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>

export default {

  props: ['product'],

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
