<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">{{ this.countProducts }} товара</span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-bind.sync="filters"
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
import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filters: {
        filterPriceFrom: 0,
        filterPriceTo: 0,
        filterCategoryId: 0,
        filterCheckedColor: 0,
        filterCheckedMemorySizes: [],
      },

      page: 1,
      productPerPage: 6,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom,
        );
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterPriceTo,
        );
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId,
        );
      }

      if (this.filterCheckedColor) {
        filteredProducts = filteredProducts.filter(
          (product) => product.colors && product.colors.some(
            (m) => this.filterCheckedColor.includes(m.value),
          ),
        );
      }

      if (this.filterCheckedMemorySizes) {
        filteredProducts = filteredProducts.filter(
          (product) => product.memorySizes && product.memorySizes.some(
            (m) => this.filterCheckedMemorySizes.includes(m),
          ),
        );
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productPerPage;
      return this.filteredProducts.slice(offset, offset + this.productPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
