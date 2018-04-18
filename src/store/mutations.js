import * as types from './mutation-types'

const mutations = {
  [types.SET_NOWCOMP] (state, router) {
    state.nowComp = router
  }
}

export default mutations
