// initial state
const state = {
  testState: true
}

// getters
const getters = {
  
}

// actions
const actions = {
  
}

// mutations
const mutations = {
  toggleTestState(state) {
    state.testState = !state.testState
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
