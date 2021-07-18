<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form js-form"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            placeholder="0"
            class="form__input"
            type="number"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            placeholder="1 000 000"
            class="form__input"
            type="number"
            name="max-price"
            v-model.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
            v-model="currentCategoryId"
          >
            <option value="0">Все категории</option>
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <!-- <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
          <ul class="colors ">
            <li class="colors__item"
              v-for="color in colorsData" :key="color.id"
            >
              <label class="colors__label">
                <input
                  class="colors__radio sr-only"
                  type="radio"
                  :value="color.code"
                  v-model="currentCheckedColor"
                />
                <span
                  class="colors__value"
                  :style="{ 'background-color': color.code }"
                ></span>
              </label>
            </li>
          </ul>
      </fieldset> -->

    <template v-if="filterCategoryId > 0">
      <fieldset class="form__block"
        v-for="prop in categoryProps" :key="prop.id"
      >
        <legend class="form__legend">
          {{ prop.title }}
        </legend>
          <ul class="check-list">
            <li class="check-list__item"
              v-for="(value, index) in prop.availableValues" :key="index"
            >
              <label class="check-list__label"
               :class="{danger: value.productsCount === 0}"
              >
                  <input
                    class="check-list__check sr-only"
                    type="checkbox"
                    :value="[prop.code, value.value]"
                    :name="prop.code"
                    v-model="currentCategoryProps"
                  >
                <span class="check-list__desc">
                  {{ value.value }}
                  <span>{{ value.productsCount }}</span>
                </span>
              </label>
            </li>
          </ul>
      </fieldset>
    </template>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>

      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      currentCheckedColor: null,
      currentPriceFrom: 1,
      currentPriceTo: 1000000,
      categoriesData: null,
      // colorsData: null,
      // currentCategoryId: 0,
      filterCategoryProps: null,
    };
  },
  props: [
    'filterPriceFrom',
    'filterPriceTo',
    'filterCategoryId',
    'filterCheckedColor',
    'productProps',
  ],
  computed: {
    currentCategoryId: {
      get() {
        return this.filterCategoryId;
      },
      set(value) {
        this.$emit('update:filterCategoryId', value);
      },
    },
    currentCategoryProps: {
      get() {
        return this.productProps;
      },
      set(value) {
        this.$emit('update:productProps', value);
      },
    },

    categories() {
      this.loadCategoriesId();
      return this.categoriesData ? this.categoriesData.items : [];
    },
    // colors() {
    //   return this.colorsData ? this.colorsData.items : [];
    // },
    categoryProps() {
      return this.filterCategoryProps ? this.filterCategoryProps.productProps : [];
    },
  },
  watch: {
    filterPriceFrom(value) {
      this.currentPriceFrom = value;
    },
    filterPriceTo(value) {
      this.currentPriceTo = value;
    },
    filterCheckedColor(value) {
      this.currentCheckedColor = value;
    },
    filterProps(value) {
      this.currentCategoryId = value;
    },

    // filtercategoryProps(value) {
    //   this.filterCategoryProps = value;
    // },
  },
  methods: {
    submit() {
      this.$emit('update:filterPriceFrom', this.currentPriceFrom);
      this.$emit('update:filterPriceTo', this.currentPriceTo);
      this.$emit('update:filterCheckedColor', this.currentCheckedColor);
      // this.$emit('update:filterCategoryId', this.currentCategoryId);
    },
    reset() {
      this.$emit('update:filterPriceFrom', 1);
      this.$emit('update:filterPriceTo', 1000000);
      this.$emit('update:filterCheckedColor', null);
      this.$emit('update:filterCategoryId', 0);
    },

    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => {
          this.categoriesData = response.data;
        });
    },
    // loadColors() {
    //   axios.get(`${API_BASE_URL}/api/colors`)
    //     .then((response) => {
    //       this.colorsData = response.data.items;
    //     });
    // },

    loadCategoriesId() {
      if (this.filterCategoryId > 0) {
        axios.get(`${API_BASE_URL}/api/productCategories/${this.filterCategoryId}`)
          .then((response) => {
            this.filterCategoryProps = response.data;
          });
      }
      this.filterCategoryProps = {};
    },
  },
  created() {
    this.loadCategories();
    // this.loadColors();
  },
};
</script>

<style scoped>
.check-list__label.danger {
  pointer-events: none;
  cursor: default;
  opacity: .3;
}
</style>
