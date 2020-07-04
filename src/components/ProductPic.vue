<template>
  <a class="catalog__pic" href="#">
    <picture>
      <source type="image/webp"
        :srcset="product.imgWebp">
        <img :src="product.image"
        :srcset="product.image2x"
        :alt="product.title">
    </picture>
  </a>
</template>

<script>
export default {
  props: ['product'],
};
</script>
