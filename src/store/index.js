import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articleMessages:[]
  },
  mutations: {
  },
  actions: {
    // changeMessage(){
    // }
  },
  modules: {
    user
  }
})
