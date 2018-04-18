import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 需要维护的状态
let state = {
  nowComp: 'serviceAudit'
}

const mutations = {
  changeComp (state, newComp) {
    state.nowComp = newComp.route
  }
}

export default new Vuex.Store({
  state,
  mutations
})
