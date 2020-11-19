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
            v-model.number="currentCategoryId"
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

      <ProductFilterColors
        :colors="colors"
        :color-checked.sync="currentCheckedColor"
      />

<!--      <fieldset class="form__block" v-if="memorySizesList">-->
<!--        <legend class="form__legend">Объемб в ГБ</legend>-->
<!--        <ul class="check-list">-->
<!--          <li-->
<!--            class="check-list__item"-->
<!--            v-for="(check, index) in memorySizesList"-->
<!--            :key="index"-->
<!--          >-->
<!--            <label class="check-list__label">-->
<!--              <input-->
<!--                class="check-list__check sr-only"-->
<!--                type="checkbox"-->
<!--                :value="check"-->
<!--                v-model="currentCheckedMemorySizes"-->
<!--              />-->
<!--              <span class="check-list__desc">-->
<!--                {{ check }}-->
<!--              </span>-->
<!--            </label>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </fieldset>-->

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
import ProductFilterColors from './ProductFilterColors.vue';

// const MEMORY_SIZES = [8, 16, 32, 64, 128, 264];
export default {
  components: { ProductFilterColors },
  data() {
    return {
      // currentCheckedMemorySizes: [],
      currentCheckedColor: 0,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,

      categoriesData: null,
      colorsData: null,
    };
  },
  props: [
    'filterPriceFrom',
    'filterPriceTo',
    'filterCategoryId',
    'filterCheckedColor',
    // 'filterCheckedMemorySizes',
  ],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
    // memorySizesList() {
    //   return MEMORY_SIZES;
    // },

  },
  watch: {
    filterPriceFrom(value) {
      this.currentPriceFrom = value;
    },
    filterPriceTo(value) {
      this.currentPriceTo = value;
    },
    filterCategoryId(value) {
      this.currentCategoryId = value;
    },
    filterCheckedColor(value) {
      this.currentCheckedColor = value;
    },
    // filterCheckedMemorySizes(value) {
    //   this.currentCheckedMemorySizes = value;
    // },
  },
  methods: {
    submit() {
      this.$emit('update:filterPriceFrom', this.currentPriceFrom);
      this.$emit('update:filterPriceTo', this.currentPriceTo);
      this.$emit('update:filterCategoryId', this.currentCategoryId);
      this.$emit('update:filterCheckedColor', this.currentCheckedColor);
      // this.$emit('update:filterCheckedMemorySizes', this.currentCheckedMemorySizes);
    },
    reset() {
      this.$emit('update:filterPriceFrom', 0);
      this.$emit('update:filterPriceTo', 0);
      this.$emit('update:filterCategoryId', 0);
      this.$emit('update:filterCheckedColor', 0);
      // this.$emit('update:filterCheckedMemorySizes', []);
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
