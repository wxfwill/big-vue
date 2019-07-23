import { SET_MAP_STATE, INIT_STATE } from '../../types';

const defaultState = {
	code: 100000,
	lev : 1,
};
const mutations    = {
	[SET_MAP_STATE](state, data) {
		state.code = data.code;
		state.lev  = data.lev;
	},
	[INIT_STATE](state){
		state.code = '100000';
		state.lev  = 1;
	},
};

const getters = {
	mapCode(state) {
		return {
			code: state.code,
			lev : state.lev
		}
	}
};

const actions = {
	setMapData({ state, commit }, { code, lev }) {
		commit(SET_MAP_STATE, {
			code,
			lev
		});
	},
	initPenalState({ state, commit }) {
		commit(INIT_STATE);
	}
};


export default {
	namespaced: true,
	state     : defaultState,
	mutations,
	actions,
	getters,
}
