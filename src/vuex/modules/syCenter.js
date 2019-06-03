import * as types from '../types.js'

const state ={
       popupShow:false
}

const getters = {
    popupShow: state => {
       return state.popupShow
    }
}

const mutations = {
    [types.POPUPSHOW](state,res){
        state.popupShow=res
    }//this.$store.commit(types.TOKEN, Object.assign(this.marketOpenCache, { currSelectedCoupon: null }))
      //将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
}

const actions = {
    // setProjectCoupons({ commit }, projectCoupons) {
    //     commit(types.PROJECT_COUPONS, projectCoupons)
    //   },//this.$store.dispatch('setProjectCoupons', res.page.records)
}

export default {
    state,
    getters,
    mutations,
    actions
}