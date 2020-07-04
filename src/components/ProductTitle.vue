<template>
  <h3 class="catalog__title">
    <a href="#">
      {{ product.title }}
    </a>
  </h3>
</template>

<script>
export default {
  props: ['product'],
};
</script>
