<template>
  <div class="error-page-wrapper">
    <h1>Страница не найдена</h1>
    <router-link class="error-button" :to="{name: 'main'}">
      Вернуться на главную
    </router-link>
  </div>
</template>

<style>
  .error-page-wrapper {
    padding: 100px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>

<script>
export default {
};
</script>
