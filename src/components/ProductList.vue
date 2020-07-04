<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="(product, index) in products" :key="index">
      <!-- <a class="catalog__pic" href="#">
        <picture>
          <source type="image/webp"
            :srcset="product.imgWebp">
            <img :src="product.image"
            :srcset="product.image2x"
            :alt="product.title">
        </picture>
      </a> -->
      <ProductPic :product="product" />
      <!-- <h3 class="catalog__title">
        <a href="#">
          {{ product.title }}
        </a>
      </h3> -->
      <ProductTitle :product="product" />

      <!-- <span class="catalog__price">
        {{ product.price }} ₽
      </span> -->
      <ProductPrice :product="product" />

      <ul class="colors colors--black">
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio"
              name="color-1" value="#73B6EA" checked="">
            <span class="colors__value" style="background-color: #73B6EA;">
            </span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" name="color-1" value="#8BE000">
            <span class="colors__value" style="background-color: #8BE000;">
            </span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" name="color-1" value="#222">
            <span class="colors__value" style="background-color: #222;">
            </span>
          </label>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import ProductPic from './ProductPic.vue';
import ProductTitle from './ProductTitle.vue';
import ProductPrice from './ProductPrice.vue';

export default {
  props: ['products'],
  components: { ProductPic, ProductTitle, ProductPrice },
};
</script>
