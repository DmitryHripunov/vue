import Vue from 'vue';
import App from './App.vue';

import textFile from './textFile';
import mainFuntion from './mainFuntion';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

mainFuntion(textFile.text1, textFile.text2);
