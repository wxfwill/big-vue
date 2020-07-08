import Vue from "vue";
import App from "./App";
import store from "./vuex/store.js";
import router from "./router/index.js";
import { getURLParameters } from "./utlis/helper";
import * as services from "./services/index";
import { USER_POWER } from "./constant/index";
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
  BreadcrumbItem
} from "element-ui";

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
  BreadcrumbItem
];
elementComponents.forEach(i => Vue.use(i));

Vue.prototype.$message = Message;
Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
  console.log(to);
  let { meta } = to,
    metaName = (meta && meta.title) || "大屏";
  // 无法访问页面所有人可以访问
  if (to.name !== "notAccess") {
    // 判断是否是第一次进入系统
    // 第一次进入系统需请求后台获取用户权限
    const firLoad = store.getters["menuModules/firLoad"];
    if (firLoad) {
      // 获取用户权限信息
      const { userId: userid } = getURLParameters(location.hash);
      const res = await services.loginJurisdiction({ userid: userid || "" });
      if (res.code === 200) {
        const data = res.data,
          powerIndex = USER_POWER[data];
        // 判断用户权限是否为空
        if (powerIndex.length > 0) {
          // 将菜单信息和用户ID存入store
          store.dispatch({
            type: "menuModules/setMenuList",
            menuIndex: powerIndex,
            userId: userid || "",
            metaName,
            path: to.path,
            routeName: to.name,
            next
          });
          return false;
        }
      } else {
        Message.error(res.msg);
      }
    } else {
      const menuList = store.getters["menuModules/menuList"],
        judicialMenuList = store.getters["menuModules/judicialMenuList"],
        { name: routeName, path } = to;
      const isPower =
        menuList.some(i => routeName === i.id) ||
        judicialMenuList.some(i => routeName === i.id);
      if (isPower) {
        store.dispatch({
          type: "menuModules/setSelectMenu",
          selectMenu: path
        });
        next();
        document.title = metaName;
        return false;
      }
    }
    // 跳转到无权限页面
    next("/notAccess");
  } else {
    next();
  }
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
