<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <picture>
        <source type="image/webp"
          :srcset="product.imgWebp">
          <img :src="product.image"
          :srcset="product.image2x"
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
      <li class="colors__item"  v-for="(color, index) in product.colors" :key="index">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio"
          :value="color" v-model="currentColor" >
          <span class="colors__value" :style="{'background-color':color }">
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
      currentColor: 0,
    };
  },
  // computed: {
  //   currentImg() {
  //     return this.product.image;
  //   },
  //   variantImg() {
  //     return this.product.variants.map((img) => img.variantImage);
  //   },
  //   variantColor() {
  //     return this.product.variants.map((color) => color.variantColor);
  //   },
  // },
  // methods: {
  //   chooseColor() {
  //     this.$emit('currentColor', this.variantImg === this.currentColor);
  //   },
  // },
};
</script>
