// 通用配置
import * as types from '../types.js'

const state = {
    allLogin: {}, // 登陆后的所有信息
    token: '', // 全局token
    login: false, // 是否登录
    userPhone: '', // 用户名称
}

const actions = {

    // setNewsDetails({commit}, data) {
    //   commit(types.NEWS_DETAILS, data)
    // }
}

const getters = {
    token: state => state.token,
    loginflag: state => state.login,
    userPhone: state => state.userPhone
}



const mutations = {

    [types.TOKEN](state, res) {
        state.token = res
    },
    [types.LOGIN](state, res) {
        state.login = res
    }

}

export default {
    state,
    actions,
    getters,
    mutations
}
