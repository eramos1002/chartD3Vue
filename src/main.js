import Vue from 'vue'
import App from './App.vue'

Vue.prototype.$svg = null; //variable de instancia VUE, tendra un valor diferente por cada instancia
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
