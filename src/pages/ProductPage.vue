<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#" @click.prevent="gotoPage('main')">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#" @click.prevent="gotoPage('main')">
            {{ category.title }}
          </a>
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
          <img width="570" height="570" :src="product.image" :alt="product.title"
            >
        </div>
<!--        <ul class="pics__list">-->
<!--          <li class="pics__item">-->
<!--            <a href="" class="pics__link pics__link&#45;&#45;current">-->
<!--              <img width="98" height="98" src="img/phone-square-1.jpg" alt="Название товара">-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="pics__item">-->
<!--            <a href="" class="pics__link">-->
<!--              <img width="98" height="98" src="img/phone-square-2.jpg" alt="Название товара">-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="pics__item">-->
<!--            <a href="" class="pics__link">-->
<!--              <img width="98" height="98" src="img/phone-square-3.jpg" alt="Название товара">-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="pics__item">-->
<!--            <a class="pics__link" href="#">-->
<!--              <img width="98" height="98" src="img/phone-square-4.jpg" alt="Название товара">-->
<!--            </a>-->
<!--          </li>-->
<!--        </ul>-->
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio"
                    name="color-item" value="blue" checked="">
                    <span class="colors__value" style="background-color: #73B6EA;">
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio"
                    name="color-item" value="yellow">
                    <span class="colors__value" style="background-color: #FFBE15;">
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio"
                    name="color-item" value="gray">
                    <span class="colors__value" style="background-color: #939393;">
                  </span></label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio"
                    name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio"
                    name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio"
                    name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" value="1" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs" v-if="tabLinkList">
          <li class="tabs__item"  v-for="tab in tabLinkList" :key="tab">
            <a class="tabs__link" href="#"
                :class="{'tabs__link--current' : tab === currentTab}"
              @click.prevent="gotoTab(tab)">
              {{ tab }}
            </a>
          </li>
        </ul>

        <component :is="currentTabComponent" :tab-params="currentTabParams" />
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
import NotFoundTab from '@/tabs/NotFoundTab.vue';

const tabs = {
  descriptionTab: 'DescriptionTab',
  propertyTab: 'PropertyTab',
};
const TAB_LINK_LIST = ['Описание', 'Характеристики', 'Гарантия', 'Оплата и доставка'];

export default {
  components: { DescriptionTab, PropertyTab, NotFoundTab },
  props: ['pageParams'],
  data() {
    return {
      currentTab: 'descriptionTab',
      currentTabParams: {},
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return products.find((product) => product.id === this.pageParams.id);
    },
    category() {
      return categories.find((category) => category.id === this.product.categoryId);
    },
    currentTabComponent() {
      return tabs[this.currentTab] || 'NotFoundTab';
    },
    tabLinkList() {
      return TAB_LINK_LIST;
    },
  },
  methods: {
    gotoPage,
    gotoTab(tabName) {
      this.currentTab = tabName;
    },
  },
};
</script>
