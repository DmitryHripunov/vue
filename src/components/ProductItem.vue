<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" >
      <picture>
        <img :src="product.image"
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
          :value="color" v-model="currentCheckedColor" @change="switchingColors">
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
      currentCheckedColor: 0,
    };
  },
  computed: {},

  watch: {
    currentCheckedColor(value) {
      this.currentCheckedColor = value;
    },
  },
  methods: {
    switchingColors() {
      return this.$emit(
        'update:switchingColors', this.currentCheckedColor,
      );
    },
  },
};
</script>
