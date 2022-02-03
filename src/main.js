import Vue from 'vue'
import App from './App.vue'

Vue.prototype.$svg = null;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
