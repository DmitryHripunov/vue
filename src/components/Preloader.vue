<template>
  <div class="loader">
    <div class="item-loader item-1"></div>
    <div class="item-loader item-2"></div>
    <div class="item-loader item-3"></div>
    <div class="item-loader item-4"></div>
  </div>
</template>

<style>
.loader {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.item-loader {
  width: 100px;
  height: 100px;
  position: absolute;
}

.item-1 {
  background-color: #FA5667;
  top: 0;
  left: 0;
  z-index: 1;
  animation: item-1_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-2 {
  background-color: #7A45E5;
  top: 0;
  right: 0;
  animation: item-2_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-3 {
  background-color: #1B91F7;
  bottom: 0;
  right: 0;
  z-index: 1;
  animation: item-3_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

.item-4 {
  background-color: #FAC24C;
  bottom: 0;
  left: 0;
  animation: item-4_move 1.8s cubic-bezier(.6,.01,.4,1) infinite;
}

@keyframes item-1_move {
  0%, 100% {transform: translate(0, 0)}
  25% {transform: translate(0, 100px)}
  50% {transform: translate(100px, 100px)}
  75% {transform: translate(100px, 0)}
}

@keyframes item-2_move {
  0%, 100% {transform: translate(0, 0)}
  25% {transform: translate(-100px, 0)}
  50% {transform: translate(-100px, 100px)}
  75% {transform: translate(0, 100px)}
}

@keyframes item-3_move {
  0%, 100% {transform: translate(0, 0)}
  25% {transform: translate(0, -100px)}
  50% {transform: translate(-100px, -100px)}
  75% {transform: translate(-100px, 0)}
}

@keyframes item-4_move {
  0%, 100% {transform: translate(0, 0)}
  25% {transform: translate(100px, 0)}
  50% {transform: translate(100px, -100px)}
  75% {transform: translate(0, -100px)}
}
</style>

<script>
export default {
};
</script>
