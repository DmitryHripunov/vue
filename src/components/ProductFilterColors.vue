<template>
  <fieldset class="form__block">
    <legend class="form__legend">Цвет</legend>
    <ul class="colors">
      <li class="colors__item" v-for="(color, index) in colors" :key="index">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="color.id"
            v-model="colorChosen"
          />
          <span
            class="colors__value"
            :style="{ 'background-color': color.code }"
          ></span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>

export default {
  props: ['colors', 'colorChecked'],

  computed: {
    colorChosen: {
      get() {
        return this.colorChecked;
      },
      set(value) {
        this.$emit('update:colorChecked', value);
      },
    },
  },
};

</script>
