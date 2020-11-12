<template>
  <button type="button"
    aria-label="Добавить один товар"
    @click.prevent="increment(item)"
  >
    <svg width="10" height="10" fill="currentColor">
      <use xlink:href="#icon-plus"></use>
    </svg>
  </button>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['item', 'amount'],

  methods: {
    ...mapMutations({ increment: 'incrementCartProduct' }),
  },
};
</script>
