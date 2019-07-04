import { SET_HOME_MAP_STATE, SET_HOME_TIME, POPUP_SHOW } from '../types';

const nowDate   = new Date();
const state     = {
	startDate: `${nowDate.getFullYear()}-01-01`,
	endDate  : `${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`,
	code     : 100000,
	lev      : 1,
	popupShow: false,
	
};
const mutations = {
	[SET_HOME_TIME](state, data) {
		state.startDate = data.startDate;
		state.endDate   = data.endDate;
	},
	[SET_HOME_MAP_STATE](state, data) {
		state.code = data.code;
		state.lev  = data.lev;
	},
	[POPUP_SHOW](state, res) {
		state.popupShow = res
	}
};

const getters = {
	getSelectDateSection(state) {
		return {
			startdate: state.startDate,
			enddate  : state.endDate
		}
	},
	getMapCode(state) {
		return {
			code: state.code,
			lev : state.lev
		}
	},
	popupShow: state => {
		return state.popupShow;
	},
};

const actions = {
	setHomeSelectTime({ state, commit }, { startDate, endDate }) {
		commit(SET_HOME_TIME, {
			startDate,
			endDate,
		});
	},
	setMapData({ state, commit }, { code, lev }) {
		commit(SET_HOME_MAP_STATE, {
			code,
			lev
		});
	},
};


export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
