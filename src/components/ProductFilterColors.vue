<template>
  <!-- <ul class="colors ">
    <li class="colors__item" v-for="color in colors" :key="color.id">
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
  </ul> -->
  <ul class="colors">
    <li class="colors__item" v-for="color in product.colors" :key="color.id">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          v-model="colorChosen"
          :value="color.color.code"
        />

        <span
          class="colors__value"
          :style="{ 'background-color': color.color.code }"
        >
        </span>
      </label>
    </li>
  </ul>
</template>

<script>

export default {
  // props: ['colors', 'colorChecked'],

  // computed: {
  //   colorChosen: {
  //     get() {
  //       return this.colorChecked;
  //     },
  //     set(value) {
  //       this.$emit('update:colorChecked', value);
  //     },
  //   },
  // },
  props: ['product'],
  data() {
    return {
      currentCheckedColor: null,
    };
  },
  computed: {
    colorChosen: {
      get() {
        return this.currentCheckedColor;
      },
      set(value) {
        this.currentCheckedColor = value;
      },
    },
  },
};

</script>
