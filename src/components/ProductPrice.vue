<template>
  <span class="catalog__price">
    {{ product.price }} ₽
  </span>
</template>

<script>
export default {
  props: ['product'],
};
</script>
