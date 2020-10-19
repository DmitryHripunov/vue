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
            v-model="currentCheckedColor"
            v-on:change="$emit('isCheckedColor', currentCheckedColor)"
          />
          <span class="colors__value" :style="{'background-color': color }"></span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>

export default {
  name: 'ProductColors',

  props: ['colors'],

  data() {
    return {
      currentCheckedColor: 0,
    };
  },
  watch: {
    currentColor(value) {
      this.currentCheckedColor = value;
    },
  },
  methods: {
    isCheckedColor() {
      this.$emit('currentColor');
    },
  },
};

</script>
