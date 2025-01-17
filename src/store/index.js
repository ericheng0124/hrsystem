import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex) // 注册Vuex

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  // Vuex的”计算属性“
  getters
})

export default store
