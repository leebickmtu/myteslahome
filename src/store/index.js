import { createStore } from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import services from '../data/services.json'

const state = {
  services,
  enabledServiceKeys: [],
  serviceCategories: ['media', 'sports', 'social', 'other'],
}

export default createStore({
  state,
  getters,
  actions,
  mutations,
})

