import Vue     from "vue";
import App     from "./App";
import store   from "./vuex/store.js";
import router  from "./router/index.js";
import {
	DatePicker,
	Carousel,
	CarouselItem,
	Select,
	Option,
	Message,
	Dialog,
	Button,
	Table,
	TableColumn,
	Popover,
}              from 'element-ui';
import './public/mock';

const elementComponents = [
		  DatePicker,
		  Carousel,
		  CarouselItem,
		  Select,
		  Option,
		  Dialog,
		  Button,
		  Table,
		  TableColumn,
		  Popover,
	  ],
	  vt                = new Vue();
elementComponents.forEach(i => Vue.use(i));

Vue.prototype.$message   = Message;
Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
	document.body.scrollTop = 0;
	if(to.meta.checkLogin) {
		if(store.getters.loginflag) {
			//只有登录的情况下才能正常跳转
			next();
		} else {
			vt.$message({
				type    : "error",
				message : "请先登录",
				duration: 1000,
				onClose : function() {
					next("/login");
				}
			});
			
		}
	} else {
		next();
	}
});

let vm = new Vue({
	el    : "#app",
	router,
	store,
	render: h => h(App)
});
