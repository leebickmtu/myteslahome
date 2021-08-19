import { createStore } from 'vuex'
import data from './modules/data'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    data
  },
  strict: debug
})
