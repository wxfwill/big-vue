import { SET_JUDICIAL_TIME, SET_JUDICIAL_MAP_STATE } from '../types';

const state     = {
	startDate: '',
	endDate  : '',
	code     : 100000,
	lev      : 1,
};
const mutations = {
	[SET_JUDICIAL_TIME](state, data) {
		state.startDate = data.startDate;
		state.endDate   = data.endDate;
	},
	[SET_JUDICIAL_MAP_STATE](state, data) {
		state.code = data.code;
		state.lev  = data.lev;
	}
};

const getters = {
	dateSection(state) {
		return {
			startdate: state.startDate,
			enddate  : state.endDate
		}
	},
	mapData(state) {
		return {
			code: state.code,
			lev : state.lev
		}
	}
};

const actions = {
	setSelectTime({ state, commit }, { startDate, endDate }) {
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
};