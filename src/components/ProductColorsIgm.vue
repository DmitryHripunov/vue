<template>
  <li class="colors__item" >
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio"
        :value="color.value"
        v-model="colorChosen"
      >
      <span class="colors__value" :style="{'background-color':color.value }">
          </span>
    </label>
  </li>
</template>

<script>
export default {
  props: ['color', 'colorChecked'],

  computed: {
    colorChosen: {
      get: function getColor() {
        return this.colorChecked;
      },
      set: function setColor(newValue) {
        this.$emit('update:colorChecked', newValue);
      },
    },
  },
};
</script>
