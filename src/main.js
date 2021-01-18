import Vue from 'vue'
import App from './App'
import Components from './components'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {Components},
  render: h => h(App)
})
