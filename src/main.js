import Vue from "vue";
import App from "./App";
// import ElementUI from "element-ui";

// import "./public/scss/theme.scss";

require('./mock'); //引入mock数据，关闭则注释该行

// 引入自定义图标
// import "@/assets/fonts/iconfont.css";

// import "babel-polyfill";

import store from "./vuex/store.js";

Vue.config.productionTip = false;

import router from "./router/index.js";

import echarts from 'echarts' //引入echarts
import "echarts-gl";
Vue.prototype.$echarts = echarts //引入组件
import china from 'echarts/map/js/china'
import { DatePicker,Carousel,CarouselItem} from 'element-ui';
Vue.use(DatePicker)
Vue.use(Carousel)
Vue.use(CarouselItem)
var vt = new Vue();

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  if (to.meta.checkLogin) {
    if (store.getters.loginflag) {
      //只有登录的情况下才能正常跳转
      next();
    } else {
      vt.$message({
        type: "error",
        message: "请先登录",
        duration: 1000,
        onClose: function() {
          next("/login");
        }
      });

    }
  } else {
    next();
  }
  // next();
});

let vm = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
