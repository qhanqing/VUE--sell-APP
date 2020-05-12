// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './common/css/base.css'
import Vuex from 'vuex'
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
/* eslint-disable no-new */
Vue.use(Vuex)
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
