import Vue                  from "vue";
import App                  from "./App";
import store                from "./vuex/store.js";
import router               from "./router/index.js";
import { getURLParameters } from './utlis/helper';
import * as services        from './services/index';
import { USER_POWER }       from './constant/index';
import {
	DatePicker,
	Carousel,
	CarouselItem,
	Select,
	Option,
	Message,
	Dialog,
	Button,
	ButtonGroup,
	Table,
	TableColumn,
	Popover,
	Pagination,
	Breadcrumb,
	BreadcrumbItem,
}                           from 'element-ui';

const elementComponents = [
	DatePicker,
	Carousel,
	CarouselItem,
	Select,
	Option,
	Dialog,
	Button,
	ButtonGroup,
	Table,
	TableColumn,
	Popover,
	Pagination,
	Breadcrumb,
	BreadcrumbItem,
];
elementComponents.forEach(i => Vue.use(i));

Vue.prototype.$message   = Message;
Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
	// 无法访问页面所有人可以访问
	if(to.name !== 'notAccess') {
		// 判断是否是第一次进入系统
		// 第一次进入系统需请求后台获取用户权限
		const firLoad = store.getters['menuModules/firLoad'];
		if(firLoad) {
			// 获取用户权限信息
			const { userId: userid } = getURLParameters(location.hash);
			/*const res                  = await services.loginJurisdiction({ userid });*/
			const res = {
				code: 200,
				data: 1,
			};
			if(res.code === 200) {
				const data       = res.data,
					  powerIndex = USER_POWER[data];
				// 判断用户权限是否为空
				if(powerIndex.length > 0) {
					// 将菜单信息和用户ID存入store
					store.dispatch({
						type     : 'menuModules/setMenuList',
						menuIndex: powerIndex,
						userId   : userid,
						next
					});
					return false;
				}
			} else {
				Message.error(res.msg);
			}
		} else {
			/*const menuList = store.getters['menuModules/menuList'],
			 toPath   = to.path,
			 isPower  = menuList.some(i => toPath.indexOf(i.id) !== -1);
			 if(isPower) {
			 store.dispatch({
			 type      : 'menuModules/setSelectMenu',
			 selectMenu: toPath
			 });
			 next();
			 return false;
			 }*/
			store.dispatch({
				type      : 'menuModules/setSelectMenu',
				selectMenu: to.path
			});
			next();
			return false;
		}
		// 跳转到无权限页面
		next('/notAccess');
	} else {
		next();
	}
});

new Vue({
	el    : "#app",
	router,
	store,
	render: h => h(App)
});
