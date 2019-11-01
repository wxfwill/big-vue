import { SET_MENU_INDEX, SET_SELECT_MENU } from '../types';

const defaultMenuList = [{
	id  : 'homePage',
	name: '首页',
	url : '/homePage',
}, {
	id  : 'judicial',
	name: '司法办案',
	url : '/judicial',
}, {
	id  : 'teamManagement',
	name: '队伍管理',
	url : '/teamManagement',
}, {
	id  : 'checkOffice',
	name: '检察办公',
	url : '/checkOffice',
}, {
	id  : 'inspectionGuarantee',
	name: '检务保障',
	url : '/inspectionGuarantee',
}];

const defaultState = {
	menuList  : [],
	userId    : '',
	selectMenu: '',
	firLoad   : true,
};
const mutations    = {
	[SET_MENU_INDEX](state, data) {
		state.menuList = data.menuList;
		state.firLoad  = data.firLoad;
		state.userId   = data.userId;
	},
	[SET_SELECT_MENU](state, data) {
		state.selectMenu = data.selectMenu;
	}
};

const getters = {
	menuList(state) {
		return state.menuList;
	},
	firLoad(state) {
		return state.firLoad;
	},
	userId(state) {
		return state.userId;
	},
	selectMenu(state) {
		return state.selectMenu;
	}
};

const actions = {
	setMenuList({ state, commit }, { menuIndex, next, userId }) {
		const menuList        = [],
			  hashPath        = location.hash.slice(1),
			  userIdParamsUrl = `userId=${userId}`;
		let hasRoute          = false,
			  selectMenu      = hashPath.slice(0, hashPath.indexOf('?'));
		menuIndex.forEach(i => {
			if(hashPath.indexOf(defaultMenuList[i].id) !== -1) {
				hasRoute = true;
			}
			menuList.push(defaultMenuList[i])
		});
		commit(SET_MENU_INDEX, {
			menuList,
			firLoad: false,
			userId : userIdParamsUrl
		});
		if(hasRoute) {
			next();
		} else {
			selectMenu = menuList[0].url;
			next(`${menuList[0].url}?${userIdParamsUrl}`);
		}
		commit(SET_SELECT_MENU, {
			selectMenu
		})
	},
	setSelectMenu({ state, commit }, { selectMenu }) {
		commit(SET_SELECT_MENU, {
			selectMenu
		})
	},
};


export default {
	namespaced: true,
	state     : defaultState,
	mutations,
	actions,
	getters,
}
