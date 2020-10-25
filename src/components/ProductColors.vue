<template>
  <fieldset class="form__block">
    <legend class="form__legend">Цвет</legend>
    <ul class="colors">
      <li class="colors__item" v-for="(color, index) in colors" :key="index">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="color"
            v-model="colorChosen"
          />
          <span
            class="colors__value"
            :style="{ 'background-color': color }"
          ></span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>

export default {
  name: 'ProductColors',
  props: ['colors', 'colorChecked'],
  // data() {
  //   return {
  //     color: 0,
  //   };
  // },

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
