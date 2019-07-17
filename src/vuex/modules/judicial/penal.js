import { SET_MAP_STATE } from '../../types';

const state     = {
	code     : 100000,
	lev      : 1,
};
const mutations = {
	[SET_MAP_STATE](state, data) {
		state.code = data.code;
		state.lev  = data.lev;
	}
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
};


export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}
