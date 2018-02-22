import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
fastclick.attach(document.body)

Vue.config.productionTip = false

window.onload = function () {

}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
