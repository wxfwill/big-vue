import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'


import com from './modules/com.js'



Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    com
  }
})
