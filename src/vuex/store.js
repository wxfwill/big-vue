import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'


import com from './modules/com.js'
import syLeft from './modules/syLeft.js'
import syCenter from './modules/syCenter.js'
import syRight from './modules/syRight.js'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    com,
    syLeft,
    syCenter,
    syRight
  }
})
