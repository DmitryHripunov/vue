<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
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

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
          <ul class="colors ">
            <li class="colors__item"
              v-for="color in colors" :key="color.id"
            >
              <label class="colors__label">
                <input
                  class="colors__radio sr-only"
                  type="radio"
                  :value="color.id"
                  v-model="currentCheckedColor"
                />
                <span
                  class="colors__value"
                  :style="{ 'background-color': color.code }"
                ></span>
              </label>
            </li>
          </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
          <ul class="check-list">
            <li class="check-list__item">
              <label class="check-list__label">
                  <input
                  class="check-list__check sr-only"
                  type="checkbox"
                  name="volume"
                  value="memory.offers"
                  checked="">
                <span class="check-list__desc">
                  8
                  <span>(313)</span>
                </span>
              </label>
            </li>
          </ul>
      </fieldset>

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
      currentCheckedColor: 0,
      currentPriceFrom: 1,
      currentPriceTo: 1000000,
      // currentCategoryId: 0, // для фильтра без перезагрузки
      currentMemory: 0,

      memoryData: null,
      categoriesData: null,
      colorsData: null,
    };
  },
  props: [
    'filterPriceFrom',
    'filterPriceTo',
    'filterCategoryId',
    'filterCheckedColor',
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

    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    memorys() {
      return this.memoryData ? this.memoryData : [];
    },
  },
  watch: {
    filterPriceFrom(value) {
      this.currentPriceFrom = value;
    },
    filterPriceTo(value) {
      this.currentPriceTo = value;
    },
    // filterCategoryId(value) { // для фильтра без перезагрузки
    //   this.currentCategoryId = value;
    // },
    filterCheckedColor(value) {
      this.currentCheckedColor = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:filterPriceFrom', this.currentPriceFrom);
      this.$emit('update:filterPriceTo', this.currentPriceTo);
      // eslint-disable-next-line max-len
      // this.$emit('update:filterCategoryId', this.currentCategoryId); // для фильтра без перезагрузки
      this.$emit('update:filterCheckedColor', this.currentCheckedColor);
    },
    reset() {
      this.$emit('update:filterPriceFrom', 1);
      this.$emit('update:filterPriceTo', 1000000);
      this.$emit('update:filterCategoryId', 0);
      this.$emit('update:filterCheckedColor', 0);
    },

    loadCategories() {
      axios.get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => {
          this.categoriesData = response.data;
        });
    },
    loadColors() {
      axios.get(`${API_BASE_URL}/api/colors`)
        .then((response) => {
          this.colorsData = response.data;
        });
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};

</script>
