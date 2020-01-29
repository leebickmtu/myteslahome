import _ from 'lodash'
import services from '../../data/services.json'

// initial state
const state = {
  services,
  enabledServiceKeys: [],
  serviceCategories: ['media', 'sports', 'social', 'other'],
}

// getters
const getters = {
  sortedServices: (state) => {
    return _.orderBy(state.services, [service => service.name.toLowerCase()], ['asc'])
  },
  enabledServices: (state, getters) => {
    return getters.sortedServices.filter(service => state.enabledServiceKeys.includes(service.key))
  },
  disabledServices: (state, getters) => {
    return getters.sortedServices.filter(service => !state.enabledServiceKeys.includes(service.key))
  },
  servicesByCategory: (state, getters) => (category) => {
    return getters.sortedServices.filter(service => service.category === category)
  }
}

// actions
const actions = {
  saveEnabledServiceKeys({ state }) {
    console.log('here')
    window.localStorage.setItem('enabledServiceKeys', JSON.stringify(state.enabledServiceKeys))
  },
  loadEnabledServiceKeys({ commit, state }) {
    const storageData = window.localStorage.getItem('enabledServiceKeys')
    if (storageData != null) {
      const data = JSON.parse(storageData)
      commit('setEnabledServiceKeys', data)
    }
    else {
      const defaultKeys = state.services.filter(service => service.default).map(service => service.key)
      commit('setEnabledServiceKeys', defaultKeys)
    }
  },
  addEnabledServiceKey({ commit, dispatch }, payload) {
    commit('addEnabledServiceKey', payload)
    dispatch('saveEnabledServiceKeys')
  },
  removeEnabledServiceKey({ commit, dispatch }, payload) {
    commit('removeEnabledServiceKey', payload)
    dispatch('saveEnabledServiceKeys')
  }
}

// mutations
const mutations = {
  setEnabledServiceKeys(state, payload) {
    state.enabledServiceKeys = payload
  },
  addEnabledServiceKey(state, payload) {
    state.enabledServiceKeys.push(payload)
  },
  removeEnabledServiceKey(state, payload) {
    state.enabledServiceKeys = state.enabledServiceKeys.filter(k => k !== payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
