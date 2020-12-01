<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">
        {{ this.countProducts }}
        {{ this.countProducts | declText(['товар', 'товара', 'товаров']) }}
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter v-bind.sync="filters" />

      <section class="catalog">
        <ProductList :products="products" v-if="!productsLoading"/>

        <Preloader v-if="productsLoading" />

        <div class="error-wrapper" v-if="productsLoadingFailed">
          <h2 class="error-heading">
            Ой!<br> Что-то пошло не так
          </h2>
          <button class="error-button" @click.prevent="loadProducts">
            перезагрузить
          </button>
        </div>

        <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="productPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import Preloader from '@/components/Preloader.vue';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    Preloader,
  },
  data() {
    return {
      filters: {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterCheckedColor: 0,
      },

      page: 1,
      productPerPage: 3,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : [];
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productPerPage,
            categoryId: this.filters.filterCategoryId,
            minPrice: this.filters.filterPriceFrom,
            maxPrice: this.filters.filterPriceTo,
            colorId: this.filters.filterCheckedColor,
          },
        })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => {
            this.productsLoadingFailed = true;
          })
          .then(() => {
            this.productsLoading = false;
          });
      }, 1000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filters: {
      handler() {
        this.loadProducts();
      },
      deep: true,
    },
  },
  filters: {
    declText: (number, titles) => {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[
        (number % 10 < 5) ? number % 10 : 5]
      ];
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
