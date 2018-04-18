// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'

Vue.use(Vuex)
Vue.use(ElementUI)
const store = new Vuex.Store({
  state: {
    authority: null,
    nowComp: 'login',
    // nowComp: 'mmpcont',
    mmpUrl: '',
    userName: '',
    baseUrl: '/api/',
    // baseUrl: '',
    urlFirst: 'service',
    urlSecond: 'serviceAudit'
  },
  mutations: {
    changeAuthority (state, authority) {
      state.authority = authority
    },
    changeUsername (state, username) {
      state.username = username
    },
    loginSu (state, nowComp) {
      state.nowComp = nowComp
    },
    changeUrlFirst (state, urlFirst) {
      state.urlFirst = urlFirst
    },
    changeUrlSecond (state, urlSecond) {
      state.urlSecond = urlSecond
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

