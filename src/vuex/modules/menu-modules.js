import { getRealType } from "../../utlis/helper";
import {
	SET_MENU_INDEX,
	SET_SELECT_MENU,
}                      from '../types';

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

const defaultJudicialMenuList = [
	{
		id   : 'criminal',
		title: '刑事',
		url  : '/judicial/criminal',
		img  : require('@/public/img/judicature/jw.png')
	},
	{
		id   : 'civil',
		title: '民事',
		url  : '/judicial/civil',
		img  : require('@/public/img/judicature/ks.png')
	},
	{
		id   : 'administrative',
		title: '行政',
		url  : '/judicial/administrative',
		img  : require('@/public/img/judicature/ms.png')
	},
	{
		id   : 'lawsuit',
		title: '公益诉讼',
		url  : '/judicial/lawsuit',
		img  : require('@/public/img/judicature/ss.png')
	},
	{
		id   : 'undetected',
		title: '未检',
		url  : '/judicial/undetected',
		img  : require('@/public/img/judicature/wj.png')
	},
	{
		id   : 'prosecution',
		title: '控申',
		url  : '/judicial/prosecution',
		img  : require('@/public/img/judicature/xs.png')
	},
	{
		id   : 'checkCharter',
		title: '检委办/检察技术',
		url  : '/judicial/checkCharter',
		img  : require('@/public/img/judicature/xz.png')
	}
];

const defaultState = {
	menuList        : [],
	judicialMenuList: [],
	userId          : '',
	selectMenu      : '',
	firLoad         : true,
};
const mutations    = {
	[SET_MENU_INDEX](state, data) {
		state.menuList         = data.menuList;
		state.firLoad          = data.firLoad;
		state.userId           = data.userId;
		state.judicialMenuList = data.judicialMenuList;
	},
	[SET_SELECT_MENU](state, data) {
		state.selectMenu = data.selectMenu;
	},
};

const getters = {
	menuList(state) {
		return state.menuList;
	},
	judicialMenuList(state) {
		return state.judicialMenuList;
	},
	firLoad(state) {
		return state.firLoad;
	},
	userId(state) {
		return state.userId;
	},
	selectMenu(state) {
		return state.selectMenu;
	},
};

const actions = {
	setMenuList({ state, commit }, { menuIndex, next, userId, metaName, path, routeName }) {
		const menuList         = [],
			  userIdParamsUrl  = `userId=${userId}`,
			  soleMenuIndex    = {};
		let hasRoute           = false,
			  selectMenu       = path,
			  judicialMenuList = [];
		// 遍历菜单下标
		menuIndex.forEach(i => {
			// 判断是否为数组代表二级子菜单
			if(getRealType(i) === 'array') {
				// 司法办案可显示的菜单
				judicialMenuList.push(defaultJudicialMenuList[i[1]]);
				i = i[0];
			} else if(i === 1) {
				// 如果下标为1，默认开启所有菜单权限
				judicialMenuList = defaultJudicialMenuList;
			}
			// 添加菜单唯一下标标识
			if(!soleMenuIndex[i]) {
				soleMenuIndex[i] = true;
				menuList.push(defaultMenuList[i])
			}
		});
		// 判断当前浏览器显示的路由是否存在
		hasRoute = menuList.some(i => routeName === i.id) || judicialMenuList.some(i => routeName === i.id);
		commit(SET_MENU_INDEX, {
			menuList,
			firLoad: false,
			userId : userIdParamsUrl,
			judicialMenuList
		});
		// 判断当前路由是否有权限访问
		if(hasRoute) {
			document.title = metaName;
			next();
		} else {
			// 无权限则跳转到第一个路由
			const firstMenu = menuList[0];
			let url         = firstMenu.url;
			if(firstMenu.id === 'judicial') {
				url = `${judicialMenuList[0].url}`;
			}
			selectMenu = url;
			next(`${url}?${userIdParamsUrl}`);
		}
		commit(SET_SELECT_MENU, {
			selectMenu
		});
	},
	setSelectMenu({ state, commit }, { selectMenu }) {
		commit(SET_SELECT_MENU, {
			selectMenu
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
