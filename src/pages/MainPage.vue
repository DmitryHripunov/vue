<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">
        {{ this.countProducts }}
        товаров
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :filter-price-from.sync="filterPriceFrom"
        :filter-price-to.sync="filterPriceTo"
        :filter-category-id.sync="filterCategoryId"
        :filter-checked-color.sync="filterCheckedColor"
      />

      <section class="catalog">
        <ProductList :products="products" />

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

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      // filters: {
      //   filterPriceFrom: 0,
      //   filterPriceTo: 0,
      //   filterCategoryId: 0,
      //   filterCheckedColor: 0,
      //   filterCheckedMemorySizes: [],
      // },
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterCheckedColor: 0,
      // filterCheckedMemorySizes: [],

      page: 1,
      productPerPage: 6,

      productsData: null,
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
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
          .then((response) => {
            this.productsData = response.data;
          });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
