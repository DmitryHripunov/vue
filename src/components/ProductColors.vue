<template>
  <fieldset class="form__block" v-if="colors">
    <legend class="form__legend">Цвет</legend>
    <ul class="colors">
      <li class="colors__item" v-for="(asideColor, index) in colors" :key="index">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :value="asideColor"
            v-model="currentCheckedColor"
          />
          <span class="colors__value" :style="{'background-color': asideColor }"></span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
const COLORS = [
  '#73B6EA',
  '#FFBE15',
  '#939393',
  '#8BE000',
  '#FF6B00',
  '#000',
];
export default {
  name: 'ProductColors',

  data() {
    return {
      currentCheckedColor: 0,
    };
  },

  computed: {
    colors() {
      return COLORS;
    },
  },

  methods: {
    changeColors() {
      this.$emit('update:currentCheckedColor', this.colors);
    },
  },
};

</script>
