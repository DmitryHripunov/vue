<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">152 товара</span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-checked.sync="filterCheckedColor"
        :volume-checked.sync="filterCheckedVolume"
      />

      <section class="catalog">
        <ProductList :products="products" />

        <BasePagination v-model="page" :count="countProducts" :per-page="productPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterCheckedColor: 0,
      filterCheckedVolume: 0,

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
<<<<<<< HEAD
          (product) => product.colors && product.colors.includes(this.filterCheckedColor),
=======
          (product) => this.filterCheckedColor.includes(product.colors),
>>>>>>> 2e79bff611f0664e933c79def8aeef067ccd2896
        );
      }

      if (this.filterCheckedVolume) {
        filteredProducts = filteredProducts.filter(
          (product) => product.volume === this.filterCheckedVolume,
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
