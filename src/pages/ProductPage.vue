<template>
    <main class="content container">
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
          <img width="570" height="570" :src="currentProductImg" :alt="product.title"
            >
        </div>
        <ul class="pics__list" v-if="product.colors">
          <li class="pics__item"
              v-for="(picture, index) in product.colors" :key="index">
<!--            <a href="#" class="pics__link pics__link&#45;&#45;current"-->
<!--               @click.prevent=""-->
<!--            >-->
              <img width="98" height="98" :src="picture.image" :alt="product.title">
<!--            </a>-->
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{ product.price * amount | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend" v-if="product.colors" > Цвет:</legend>
              <ul class="colors">
                <ProductColorsIgm
                  v-for="(color, index) in product.colors" :key=index :color="color"
                  :color-checked.sync="currentCheckedColor"
                />
              </ul>
            </fieldset>

            <div class="item__row">
              <Counter :amount.sync="amount" />

              <button class="button button--primery" type="submit">
                В корзину
              </button>
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
import products from '@/data/products';
import categories from '@/data/categories';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import DescriptionTab from '@/tabs/DescriptionTab.vue';
import PropertyTab from '@/tabs/PropertyTab.vue';
import GuaranteeTab from '@/tabs/GuaranteeTab.vue';
import PaymentTab from '@/tabs/PaymentTab.vue';
import NotFoundTab from '@/tabs/NotFoundTab.vue';
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
    DescriptionTab,
    PropertyTab,
    GuaranteeTab,
    NotFoundTab,
    PaymentTab,
    Counter,
  },
  data() {
    return {
      TABS,
      currentTabComponent: 'DescriptionTab',
      amount: 1,
      currentCheckedColor: 0,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return products.find((product) => product.id === +this.$route.params.id);
    },
    category() {
      return categories.find((category) => category.id === this.product.categoryId);
    },
    currentProductImg() {
      const checkedColor = this.currentCheckedColor;
      if (this.product.colors) {
        if (checkedColor && checkedColor === this.product.colors[0].value) {
          return this.product.colors[0].image;
        }
        if (checkedColor && checkedColor === this.product.colors[1].value) {
          return this.product.colors[1].image;
        }
        if (checkedColor && checkedColor === this.product.colors[2].value) {
          return this.product.colors[2].image;
        }
      }
      return this.product.image;
    },
  },
  methods: {
    gotoPage,
    addToCart() {
      this.$store.commit(
        'addProductToCart',
        { productId: this.product.id, amount: this.amount },
      );
    },
  },
};
</script>
