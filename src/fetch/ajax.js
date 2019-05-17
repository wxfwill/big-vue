import Vue from "vue";
import axios from "axios";
import qs from "qs";
import store from "../vuex/store.js";

Vue.prototype.$ajax = axios;
var vm = new Vue();
// axios配置
// axios.defaults.timeout = 5000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = '/mgc-pc5/';

//POST传参序列化
axios.interceptors.request.use(
  config => {
    config.headers[
      "Content-Type"
    ] = `application/x-www-form-urlencoded;charset=UTF-8`;
    // console.log(config.url);
    if (store.state.com.token) {
      config.headers["token"] = `${store.state.com.token}`;
    }
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    // config.headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //     'token': '113930903cbc48ad9a00f22b9cde0aff'
    // };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//返回状态判断
axios.interceptors.response.use(
  res => {
    // console.log(res.headers.token);
    if (res.data.code == 208) {
      vm.$message({
        type: "error",
        message: "token失效，請從新登陸",
        duration: 2000,
        onClose: function() {
          store.commit("LOGIN", false);
          window.localStorage.setItem("vuex-along", "");
          window.location.href = "/login";
        }
      });
    } else {
      return res;
    }
    // return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        response => {
          resolve(response);
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}

export default {
  // 资金账户 充币记录接口
  getRechargeList(params) {
    return fetch("/api/usertransaction/querytransactionlist", params);
  },
  // 获取个人信息的接口
  getInformationUser() {
    return fetch("/api/user/userList");
  }
};
