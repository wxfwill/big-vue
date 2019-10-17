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
	ButtonGroup,
	Table,
	TableColumn,
	Popover,
	Pagination,
	Breadcrumb,
	BreadcrumbItem,
}              from 'element-ui';


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
	  ],
	  vt                = new Vue();
elementComponents.forEach(i => Vue.use(i));

Vue.prototype.$message   = Message;
Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
	document.body.scrollTop = 0;
	if(to.meta.checkLogin) {
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
