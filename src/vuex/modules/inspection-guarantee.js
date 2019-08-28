import { SET_DATE, SET_MAP_STATE } from '../types';
import { fillZero }                from "@/utlis/helper";

const state     = {
	startDate: '',
	endDate  : '',
	code     : "100000",
	lev      : 1,
};
const mutations = {
	[SET_DATE](state, data) {
		state.startDate = data.startDate;
		state.endDate   = data.endDate;
	},
	[SET_MAP_STATE](state, data) {
		state.code = data.code;
		state.lev  = data.lev;
	}
};

const getters = {
	selectDateSection(state) {
		return {
			startdate: state.startDate,
			enddate  : state.endDate
		}
	},
	selectedMapCode(state) {
		return {
			code: state.code,
			lev : state.lev
		}
	}
};

const actions = {
	setSelectTime({ state, commit }, { startDate, endDate }) {
		commit(SET_DATE, {
			startDate,
			endDate,
		});
	},
	setMapData({ state, commit }, { code, lev }) {
		commit(SET_MAP_STATE, {
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
