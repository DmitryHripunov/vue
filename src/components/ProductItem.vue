<template>
  <li class="catalog__item">
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <picture>
        <img :src="product.image" :alt="product.title" />
      </picture>
    </router-link>

    <template
      v-if="!currentCheckedProps &&
        !currentCheckedColor"
    >
      <h3 class="catalog__title">
        <router-link
          :to="{ name: 'product', params: { id: product.id } }"
        >
          {{ product.title }}
        </router-link>
      </h3>

      <span class="catalog__price">
        {{ product.price | numberFormat }} ₽
      </span>
    </template>

    <template
      v-if="currentCheckedProps"
    >
      <h3 class="catalog__title">
        <router-link
          :to="{ name: 'product', params: { id: product.id } }"
        >
          {{ currentCheckedProps }}
        </router-link>
      </h3>

      <span class="catalog__price"
        v-for="price in productOffers" :key="price.id"
      >
        {{ price.price | numberFormat }} ₽
      </span>
    </template>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.id">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            v-model="colorChosen"
            :value="color.id"
          />

          <span
            class="colors__value"
            :style="{ 'background-color': color.color.code }"
          >
          </span>
        </label>
      </li>
    </ul>

    <ul class="sizes sizes--primery"
      style="margin-top: 16px"
      v-if="offers && offers.length > 1"
    >
      <li class="sizes__item"
        v-for="offer in offers" :key="offer.id"
      >
        <div
          v-for="prop in offer.propValues" :key="prop.value"
        >
          <label class="sizes__label">
            <input
              class="sizes__radio sr-only"
              type="radio"
              :value="offer.title"
              v-model="propsChosen"
            />
            <span class="sizes__value"> {{ prop.value }} </span>
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
      currentCheckedProps: null,
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
    propsChosen: {
      get() {
        return this.currentCheckedProps;
      },
      set(value) {
        this.currentCheckedProps = value;
      },
    },
    productOffers() {
      return this.offers;
    },
  },
};
</script>
