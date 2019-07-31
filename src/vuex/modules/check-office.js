import { SET_DATE }               from '../types';
import { getNowYear, getNowDate } from "@/utlis/helper";

const defaultState = {
	startDate: `${getNowYear()}-01-01`,
	endDate  : getNowDate(),
};
const mutations    = {
	[SET_DATE](state, data) {
		state.startDate = data.startDate;
		state.endDate   = data.endDate;
	}
};

const getters = {
	selectDateSection(state) {
		return {
			startdate: state.startDate,
			enddate  : state.endDate
		}
	},
};

const actions = {
	setSelectDate({ state, commit }, { startDate, endDate }) {
		commit(SET_DATE, {
			startDate,
			endDate,
		});
	}
};


export default {
	namespaced: true,
	state     : defaultState,
	mutations,
	actions,
	getters,
}
