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
    if (store.state.com.langType) {
      if (store.state.com.langType == "zh") {
        config.headers["language"] = 1;
      } else if (store.state.com.langType == "en") {
        config.headers["language"] = 2;
      } else if (store.state.com.langType == "zhTw") {
        config.headers["language"] = 3;
      }
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
  // 等级手续费列表
  getGradeList() {
    return fetch("/api/rank/list");
  },
  // 獎勵活動參數
  getActivityPrean() {
    return fetch("/api/activity/rewardList");
  },
  // 活动期间手续费列表
  getActivityList() {
    return fetch("/api/activity/list");
  },
  // 提币手续费列表
  getCurrencyMoneyList(params) {
    return fetch("/api/rate/getcrateall", params);
  },
  // 交易手续费列表
  getTradeList(params) {
    return fetch("/api/rate/geterateall", params);
  },
  // 获取我的持币分红信息
  getUserBonusInif() {
    return fetch("/api/user/getBonusInfo");
  },
  //获取全部持币分红信息
  getBonusInfoAll() {
    return fetch("/api/user/getBonusInfoAll");
  },
  // 首页获取banner
  selectBanner(params) {
    return fetch("/api/banner/selectState", params);
  },
  // 测试获取分区的交易对
  // getCurrencyList(params) {
  //   return fetch("/api/currencybase/getcurrencylList", params);
  // },
    // getCurrencyList(params) {
    //     return fetch("/mg_api/quot_exrate_pull", params);
    // },
  // 法币交易买入页面
  frenchbuyapi(params) {
    return fetch("/api/advertising/queryAdvertisingList", params);
  },
  // 法币交易下单接口uuuuu
  frenchOrder(params) {
    return fetch("/api/fiatDealTradeOrder/add", params);
  },
  // 登陆页面
  loginInit(params) {
    return fetch("/api/user/userLogin", params);
  },
  // 修改登录密码
  repeatLoginPassword(params) {
    return fetch("/api/user/modifyPassword", params);
  },
  resetLoginPasswrod(params) {
    return fetch("/api/user/resetPassword", params);
  },
  // 手机注册
  registerInit(params) {
    return fetch("/api/user/userRegister", params);
  },
  // 邮箱注册
  getEmilCode(params) {
    return fetch("/api/user/sendEmailCode", params);
  },
  // 图片验证码
  getImgCode() {
    return fetch("/api/user/getVerify");
  },
  // 资金账户获取法币列表
  getAccountFrenchList(params) {
    return fetch("/api/capitalaccount/getuff", params);
  },
  // 资金账户提币
  getMoney(params) {
    return fetch("/api/coin/drawCoin", params);
  },
  // 资金账户提币列表查询
  getMoneyList(params) {
    return fetch("/api/coin/drawCoinList", params);
  },
  // 获取谷歌的key
  getGoogleKey(params) {
    return fetch("/api/user/getGoogleSecret", params);
  },
  // 谷歌认证
  getGooleEnable(params) {
    return fetch("/api/user/setGoogle", params);
  },
  // 资金账户获取币币列表
  getAccountBbList(params) {
    return fetch("/api/capitalaccount/getucc", params);
  },
  // 资金账户 币币的详情信息
  getCoinFuninfo(params) {
    return fetch("/api/coin/getCoinFundsInfo", params);
  },
  // 获取当前币种可转数额
  getAccountNum(params) {
    return fetch("/api/capitalaccount/getnumber", params);
  },
  // 资金账户 资金划入 确定提交接口
  getAccountMoneyMust(params) {
    return fetch("/api/capitalaccount/uptransfer", params);
  },
  // 资金账户 充币url
  getRechargeUrl(params) {
    return fetch("/api/coin/getCoinAddress", params);
  },
  // 资金账户 充币记录接口
  getRechargeList(params) {
    return fetch("/api/usertransaction/querytransactionlist", params);
  },
  // 获取个人信息的接口
  getInformationUser() {
    return fetch("/api/user/userList");
  },
  // 设置资金密码
  setZjPassword(params) {
    return fetch("/api/user/modifyMoneyPassword", params);
  },
  // 获取用户实名认证信息
  selectUserIdentity(params) {
    return fetch("/api/user/getUserIdentity", params);
  },
  // 实名认证
  certification(params) {
    return fetch("/api/user/setUserIdentity", params);
  },
  // 商家申请
  merchantApply(params) {
    return fetch("/api/coin/forMerchart", params);
  },
  // 获取申请币种限额
  selectApplyCoinNum(params) {
    return fetch("/api/coin/getformerchartway", params);
  },
  // 查询申请状态
  selectApplyState() {
    return fetch("/api/coin/getForMerchart");
  },
  // 查询订单信息
  selectOrder(params) {
    return fetch("/api/fiatDealTradeOrder/getFiatDealTradeOrder", params);
  },
  // 标记订单
  updateOrder(params) {
    return fetch("/api/fiatDealTradeOrder/updateFiatDealTradeOrder", params);
  },
  // 取消订单
  deleteOrder(params) {
    return fetch("/api/fiatDealTradeOrder/closeFiatTradeOrder", params);
  },
  // 手机验证码
  getTelphoneCode(params) {
    return fetch("/api/user/sendCode", params);
  },
  // 邮箱验证码
  getEmailCode(params) {
    return fetch("/api/user/sendEmailCode", params);
  },
  // 公告查列表/mgcexmg
  getnoticelist(params) {
    return fetch("/api/noticemage/getnoticeall", params);
  },
  // 公告列表详情
  getnoticeDetails(params) {
    return fetch("/api/noticemage/getnoticemageone", params);
  },
  // 二次认证
  getLogin2(params) {
    return fetch("/api/user/setLogin2", params);
  },
  // 二次认证取消
  twoCannel() {
    return fetch("/api/user/cancelValidate");
  },
  // 二次认证 验证谷歌验证码
  checkGoolgleCode(params) {
    return fetch("/api/user/validateGoogle", params);
  },
  // 开启或关闭谷歌认证
  getGoolgleState(params) {
    return fetch("/api/user/closeOrOpenGoogle", params);
  },
  // 绑定支付方式
  bindPayWay(params) {
    return fetch("/api/coin/setPayWay", params);
  },
  // 查询支付方式
  selectPayWay(params) {
    return fetch("/api/coin/getPayWay", params);
  },
  // 上传图片
  uploadBase64Img(params) {
    return fetch("/api/upload/uploadImgMoreBase64", params);
  },
  // 发布广告
  insertAdvertising(params) {
    return fetch("/api/advertising/addAdvertising", params);
  },
  // 获取广告列表
  selectAdvertisingList(params) {
    return fetch("/api/advertising/list", params);
  },
  // 撤销广告
  cancelAdvertising(params) {
    return fetch("/api/advertising/cancel", params);
  },
  // 获取币种
  selectCurrencyList(params) {
    return fetch("/api/advertising/initCoinProperty", params);
  },
  // 币币交易是否完成首次交易
  isFirstTrade(params) {
    return fetch("/api/user/isFirstTransaction", params);
  },
  // 发起申诉
  insertAppeal(params) {
    return fetch("/api/coin/setLawsuitRecord", params);
  },
  // 获取用户申诉信息
  selectUserAppeal(params) {
    return fetch("/api/coin/getLawsuitRecord", params);
  },
  // 获取法币交易记录
  selectDealRecord(params) {
    return fetch("/api/fiatDealTradeOrder/getFiatDealTradeOrderList", params);
  },
  // 获取充币
  selectRechargeCurRecord(params) {
    return fetch("/api/usertransaction/querytransactionlist", params);
  },
  // 提币记录
  selectCashCurRecord(params) {
    return fetch("/api/coin/drawCoinList", params);
  },
  // 获取交易对
  selectTransactionQueue(params) {
    return fetch("/api/currencybase/getcurrencysubchail", params);
  },
  // 盘面行情
  // selectSurfaceQuotes(params) {
  //   return fetch("/api/quotes/surface", params);
  // },

  // 查询用户成交记录
  selectUserDealRecord(params) {
    return fetch("/api/c2c/historyEntrustments", params);
  },
  // 获取用户委托记录
  selectUserEntrustments(params) {
    return fetch("/api/c2c/myEntrustments", params);
  },
  // 更改委托状态
  updateEntrustStatus(params) {
    return fetch("/api/c2c/updateEntrustment", params);
  },
  // 委托下单
  addEntrustmentOrder(params) {
    return fetch("/api/c2c/addEntrustment", params);
  },
  // 买卖五档记录
  selectUnsettledGear(params) {
    return fetch("/api/quotes/unsettledGear", params);
  },
  // 最新成交记录
  newDealRecord(params) {
    return fetch("/api/c2c/dealRecords", params);
  },
  // 通过币种获取法币余额
  selectUserFiatBalance(params) {
    return fetch("/api/advertising/userFiatFundsInfo", params);
  },
  // 通过币种获取币币余额
  selectUserCurBalance(params) {
    return fetch("/api/coin/getCoinFundsInfo", params);
  },
  // 获取BYC行情
  selectBYCMarket(params) {
    return fetch("/api/quotes/international", params);
  },
  // 绑定手机号或者邮箱
  bindTelphoneOrEmail(params) {
    return fetch("/api/user/setEmailOrPhone", params);
  },
  // 获取自选交易对
  selectOptional(params) {
    return fetch("/api/c2c/selfSelected", params);
  },
  // 添加自选交易对
  insertOptional(params) {
    return fetch("/api/c2c/addSelfSelected", params);
  },
  // 取消自选交易对
  updateOptional(params) {
    return fetch("/api/c2c/delSelfSelected", params);
  },
  // 获取最小交易量
  selectMinVolume() {
    return fetch("/api/c2c/getMinVolume");
  },
  // 获取最小变动单位
  selectMinUnit() {
    return fetch("/api/c2c/getMinWave");
  },
  // 获取所有法币币种
  selectCoinDataList(params) {
    return fetch("/api/c2c/getCoin", params);
  },
  // 获取所有币币币种
  selectAllCoinList(params) {
    return fetch("/api/currencybase/getcurrencybase", params);
  },
  // 获取币种详情
  selectCoinInformation(params) {
    return fetch("/api/c2c/getCoinInfo", params);
  },
  // 获取用户VIP等级
  selectUserVip(params) {
    return fetch("/api/rank/current", params);
  },
  //获取友情链接
  getFriendshipListAll(params) {
    return fetch("/api/friendship/getFriendshipListAll", params);
  },
  // 留言反馈
  getFeedbackList(params) {
    return fetch("/api/feedback/list", params)
  },
  //留言反馈对话详情
  getFeedDetails(params) {
    return fetch('/api/feedback/detail', params)
  },
  // 新增留言反馈
  getNewFeed(params) {
    return fetch('/api/feedback/new', params)
  },
  // 更新留言反馈
  getUpdataFeed(params) {
    return fetch('/api/feedback/update', params)
  },
  //查询系统当前法币币种
  queryCurType() {
    return fetch('/api/sysParam/envUnit')
  },
  //查询法币汇率
  queryRate(params) {
    return fetch('/api/rate/get', params)
  },
  // 社区活动
  shequActivity(params) {
    return fetch('/api/community/getCommunityList', params)
  }
};
