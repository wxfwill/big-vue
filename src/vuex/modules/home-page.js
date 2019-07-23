import { SET_MAP_STATE, SET_DATE, INIT_STATE } from '../types';
import { getNowYear, getNowDate }              from "@/utlis/helper";

const defaultState = {
	startDate: `${getNowYear()}-01-01`,
	endDate  : getNowDate(),
	code     : 100000,
	lev      : 1,
};
const mutations    = {
	[SET_DATE](state, data) {
		state.startDate = data.startDate;
		state.endDate   = data.endDate;
	},
	[SET_MAP_STATE](state, data) {
		state.code = data.code;
		state.lev  = data.lev;
	},
	[INIT_STATE](state) {
		state.code = '100000';
		state.lev  = 1;
	},
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
	}
};

const actions = {
	initHomeState({ state, commit }) {
		commit(INIT_STATE);
	},
	setHomeSelectTime({ state, commit }, { startDate, endDate }) {
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
	state     : defaultState,
	mutations,
	actions,
	getters,
}
