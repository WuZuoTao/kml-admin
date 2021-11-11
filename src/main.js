import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import './common/css/reset.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios
//store
import store from './store'
 
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
