<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <picture>
        <img :src="product.image"
             :alt="product.title">
      </picture>
    </router-link>

    <template
      v-if="!currentCheckedProp && !currentCheckedColor"
    >
      <h3 class="catalog__title">
        <router-link :to="{name: 'product', params: {id: product.id}}">
          {{ product.title }}
        </router-link>
      </h3>

      <span class="catalog__price">
        {{ product.price | numberFormat }} ₽
      </span>
    </template>

    <template
      v-if="currentCheckedProp"
    >
      <h3 class="catalog__title">
        <router-link :to="{name: 'product', params: {id: product.id}}">
          {{ currentCheckedProp }}
        </router-link>
      </h3>

      <span class="catalog__price">
        {{ currentCheckedProp.price| numberFormat }} ₽
      </span>
    </template>

    <ul class="colors colors--black">
      <li class="colors__item"
        v-for="color in product.colors" :key="color.id"
      >
        <label class="colors__label">
          <input
          class="colors__radio sr-only"
          type="radio"
          v-model="colorChosen"
          :value="color.color.code">

          <span class="colors__value"
          :style="{'background-color': color.color.code}">
          </span>
        </label>
      </li>
    </ul>

    <ul class="sizes" style="margin-top: 16px;"
      v-if="offers && offers.length > 1"
    >
      <li class="sizes__item"
        v-for="offer in product.offers"
        :key="offer.id"
      >
        <div
          v-for="(prop, index) in offer.propValues"
          :key="index"
        >
          <label class="sizes__label">
            <input class="sizes__radio sr-only"
              type="radio"
              :value="offer.title"
              :price="offer.price"
              v-model="propChosen"
            >

            <!-- <input class="sizes__radio sr-only"
              type="hidden"
              :price="offer.price"
              v-model="priceChosen"
            > -->

            <span class="sizes__value">
              {{ prop.value }}
            </span>
          </label>
        </div>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      currentCheckedColor: null,
      currentCheckedProp: null,
      currentCheckedPrice: null,
    };
  },
  props: ['product', 'offers'],

  filters: {
    numberFormat,
  },
  computed: {
    colorChosen: {
      get() {
        return this.currentCheckedColor;
      },
      set(value) {
        this.currentCheckedColor = value;
      },
    },
    propChosen: {
      get() {
        return [
          this.currentCheckedProp,
          this.currentCheckedPrice,
        ];
      },
      set(value, price) {
        this.currentCheckedProp = value;
        this.currentCheckedPrice = price;
      },
    },
    // priceChosen: {
    //   get() {
    //     return this.currentCheckedPrice;
    //   },
    //   set(price) {
    //     this.currentCheckedPrice = price;
    //   },
    // },
  },
};
</script>
