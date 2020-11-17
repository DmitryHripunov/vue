<template>
  <div class="product__counter form__counter">
    <button type="button"
      aria-label="Убрать один товар"
      @click="decrement"
      :disabled="amount <= 0 || amount === ''"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="number" name="count" v-model.number="count">

    <button type="button"
      aria-label="Добавить один товар"
      @click="increment"
      :disabled="amount === ''"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['amount'],
  computed: {
    count: {
      get() {
        return this.amount;
      },
      set(value) {
        this.$emit('update:amount', value);
      },
    },
  },

  methods: {
    increment() {
      this.count += 1;
    },
    decrement() {
      this.count -= 1;
    },
  },
};
</script>
