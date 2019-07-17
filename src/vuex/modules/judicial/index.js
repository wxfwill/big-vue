import { SET_DATE } from '../../types';

const state     = {
	startDate: '',
	endDate  : '',
};
const mutations = {
	[SET_DATE](state, data) {
		state.startDate = data.startDate;
		state.endDate   = data.endDate;
	}
};

const getters = {
	dateSection(state) {
		return {
			startdate: state.startDate,
			enddate  : state.endDate
		}
	}
};

const actions = {
	setSelectTime({ state, commit }, { startDate, endDate }) {
		commit(SET_DATE, {
			startDate,
			endDate,
		});
	}
};


export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};