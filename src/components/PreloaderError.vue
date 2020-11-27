<template>
  <div class="error-wrapper">
    <h2 class="error-heading">
      Ой!<br> Что-то пошло не так
    </h2>
    <button class="error-button" type="button" @click.prevent="load">
      перезагрузить
    </button>
  </div>
</template>

<style>
.error-wrapper {
  position: absolute;
  max-width: 400px;
  height: 200px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}

.error-heading {
  margin-bottom: 40px;
  font-size: 20px;
  font-family: PressStart,sans-serif;
}

.error-button {
  padding: 20px;
  background-color: #9eff00;
  border: 1px solid #9eff00;
  font-family: PressStart,sans-serif;
  color: #222;
  font-size: 13px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color .2s ease-in-out;
}

.error-button:hover {
  background-color: transparent;
  transition: background-color .2s ease-in-out;
}
</style>

<script>
export default {
  props: ['productsData'],
  methods: {
    load() {
      this.$emit('update:productsData', this.loadProducts);
    },
  },
};
</script>
