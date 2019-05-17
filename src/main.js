import Vue from "vue";
import App from "./App";
import ElementUI from "element-ui";
import axios from "axios";

// import "./public/scss/theme.scss";


// 引入自定义图标
// import "@/assets/fonts/iconfont.css";

// import "babel-polyfill";

import store from "./vuex/store.js";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;


import router from "./router/index.js";

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
