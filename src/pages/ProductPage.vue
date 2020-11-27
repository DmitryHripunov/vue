<template>
  <div style="height: 55vh; position: relative" v-if="productLoading">
    <Preloader />
  </div>

  <div class="error-wrapper" style="height: 55vh" v-else-if="productLoadingField">
    <h2 class="error-heading">
      Ой!<br> Что-то пошло не так
    </h2>
    <button class="error-button" @click.prevent="loadProduct">
      перезагрузить
    </button>
  </div>

  <main class="content container" v-else-if="productsData">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
               :src="productsData.image.file.url"
               :alt="product.title"
            >
        </div>
<!--        <ul class="pics__list" v-if="product.colors">-->
<!--          <li class="pics__item"-->
<!--              v-for="(picture, index) in product.colors" :key="index">-->
<!--&lt;!&ndash;         <a href="#" class="pics__link pics__link&#45;&#45;current"&ndash;&gt;-->
<!--&lt;!&ndash;               @click.prevent=""&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--              <img width="98" height="98" :src="picture.image" :alt="product.title">-->
<!--&lt;!&ndash;            </a>&ndash;&gt;-->
<!--          </li>-->
<!--        </ul>-->
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price * amount | numberFormat }} ₽
            </b>

            <ul class="colors" v-if="productsData.colors">
              <ProductFilterColors
                :colors="productsData.colors"
                :color-checked.sync="currentCheckedColor"
              />
            </ul>

            <div class="item__row">
              <Counter :amount.sync="amount" />

              <button class="button button--primery" type="submit"
                :disabled="productAddSending"
              >
                <span v-if="!productAddSending">В корзину</span>
                <span v-show="productAddSending">Добавляем</span>
              </button>

              <div v-show="productAdded">
                <span > Товар добавлен</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs" v-if="TABS">
          <li class="tabs__item"  v-for="tab in TABS" :key="tab.id">
            <a class="tabs__link" href="#"
                :class="{'tabs__link--current' : currentTabComponent === tab.component}"
              @click.prevent="currentTabComponent = tab.component">
              {{ tab.title }}
            </a>
          </li>
        </ul>

        <component :is="currentTabComponent" />
      </div>
    </section>
  </main>
</template>

<script>
import Preloader from '@/components/Preloader.vue';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import ProductFilterColors from '@/components/ProductFilterColors.vue';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import DescriptionTab from '@/tabs/DescriptionTab.vue';
import PropertyTab from '@/tabs/PropertyTab.vue';
import GuaranteeTab from '@/tabs/GuaranteeTab.vue';
import PaymentTab from '@/tabs/PaymentTab.vue';
import NotFoundTab from '@/tabs/NotFoundTab.vue';
import { mapActions } from 'vuex';
import Counter from '../components/Counter.vue';

const TABS = [
  {
    id: 1,
    title: 'Описание',
    component: 'DescriptionTab',
  },
  {
    id: 2,
    title: 'Характеристики',
    component: 'PropertyTab',
  },
  {
    id: 3,
    title: 'Гарантия',
    component: 'GuaranteeTab',
  },
  {
    id: 4,
    title: 'Оплата и доставка',
    component: 'PaymentTab',
  },
];

export default {
  components: {
    ProductFilterColors,
    DescriptionTab,
    PropertyTab,
    GuaranteeTab,
    NotFoundTab,
    PaymentTab,
    Counter,
    Preloader,
  },
  data() {
    return {
      TABS,
      currentTabComponent: 'DescriptionTab',
      amount: 1,
      currentCheckedColor: 0,

      productsData: null,
      productLoading: false,
      productLoadingField: false,

      productAdded: false,
      productAddSending: false,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return this.productsData;
    },
    category() {
      return this.productsData.category;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),

    gotoPage,
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCart({ productId: this.product.id, amount: this.amount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    loadProduct() {
      this.productLoading = true;
      this.productLoadingField = false;
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => {
            this.productLoadingField = true;
          })
          .then(() => {
            this.productLoading = false;
          });
      }, 3000);
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },
};
</script>
