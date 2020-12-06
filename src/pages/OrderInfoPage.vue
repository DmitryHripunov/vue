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
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title" v-if="orderInfo">
        Заказ оформлен <span>№ {{ this.orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;
            деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary" v-if="orderInfo">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ this.orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ this.orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ this.orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ this.orderInfo .email }}
              </span>
            </li>
<!--            <li class="dictionary__item">-->
<!--              <span class="dictionary__key">-->
<!--                Способ оплаты-->
<!--              </span>-->
<!--              <span class="dictionary__value">-->
<!--                картой при получении-->
<!--              </span>-->
<!--            </li>-->
          </ul>
        </div>

        <router-link tag="button"
                     class="error-button" :to="{name: 'main'}">
          На главную
        </router-link>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="(item, index) in basketInfo" :key="index">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price | numberFormat }} ₽</b>
              <span>Артикул: {{item.product.id}}</span>
            </li>
<!--            <li class="cart__order">-->
<!--              <h3>Гироскутер Razor Hovertrax 2.0ii</h3>-->
<!--              <b>4 990 ₽</b>-->
<!--              <span>Артикул: 150030</span>-->
<!--            </li>-->
<!--            <li class="cart__order">-->
<!--              <h3>Электрический дрифт-карт Razor Lil’ Crazy</h3>-->
<!--              <b>8 990 ₽</b>-->
<!--              <span>Артикул: 150030</span>-->
<!--            </li>-->
          </ul>

          <div class="cart__total">
<!--            <p>Доставка: <b>500 ₽</b></p>-->
            <p>Итого:
              <b>{{ basketInfo.length }}</b>
              {{basketInfo.length | declText(['товар', 'товара', 'товаров']) }}
              на сумму <b>{{orderInfo.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import declTextMixin from '@/mixins/declTextMixin';

export default {
  computed: {
    orderInfo() {
      return this.$store.state.orderInfo;
    },
    basketInfo() {
      return this.orderInfo.basket.items;
    },
  },
  watch: {
    '$route.params.id': {
      handler(v) {
        this.$store.dispatch('loadOrderInfo', v)
          .catch(() => { this.$router.push('/404'); });
      },
      immediate: true,
    },
  },
  filters: {
    numberFormat,
  },
  mixins: [declTextMixin],
};
</script>
