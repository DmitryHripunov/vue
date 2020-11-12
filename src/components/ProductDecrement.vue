<template>
  <button type="button"
    aria-label="Убрать один товар"
    @click.prevent="decrement(item)"
  >
    <svg width="12" height="12" fill="currentColor">
      <use xlink:href="#icon-minus"></use>
    </svg>
  </button>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['item', 'amount'],

  methods: {
    ...mapMutations({ decrement: 'decrementCartProduct' }),
  },
};
</script>
