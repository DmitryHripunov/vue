<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      action="#"
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

      <ProductColors
        :colors="colors"
        :color-checked.sync="currentCheckedColor"
      />

      <fieldset class="form__block" v-if="memorySizesList">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="(check, index) in memorySizesList"
            :key="index"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                :value="check"
                v-model="currentCheckedMemorySizes"
              />
              <span class="check-list__desc">
                {{ check }}
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
import ProductColors from './ProductColors.vue';
import categories from '../data/categories';

const MEMORY_SIZES = [8, 16, 32, 64, 128, 264];
const COLORS = ['#73B6EA', '#FFBE15', '#939393', '#8BE000', '#FF6B00', '#000'];
export default {
  components: { ProductColors },
  data() {
    return {
      currentCheckedMemorySizes: [],
      currentCheckedColor: 0,
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
    };
  },
  props: [
    'filterPriceFrom',
    'filterPriceTo',
    'filterCategoryId',
    'filterCheckedColor',
    'filterCheckedMemorySizes',
  ],
  computed: {
    categories() {
      return categories;
    },
    colors() {
      return COLORS;
    },
    memorySizesList() {
      return MEMORY_SIZES;
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorChecked(value) {
      this.currentCheckedColor = value;
    },
    memorySizesChecked(value) {
      this.currentCheckedMemorySizes = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorChecked', this.currentCheckedColor);
      this.$emit('update:memorySizesChecked', this.currentCheckedMemorySizes);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorChecked', 0);
      this.$emit('update:memorySizesChecked', []);
    },
  },
};

</script>
