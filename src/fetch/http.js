import Vue from "vue";
import axios from "axios";

Vue.prototype.$http = axios.create({
    baseURL: '/mg_api/',
    timeout: 0,
    // headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
    headers: {'content-type': 'application/json'}
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        Vue.prototype.$http.post(url, params).then(response => {
                resolve(response);
            },
            err => {
                reject(err);
            }
        ).catch(error => {
            reject(error);
        });
    });
}

export default {
    // C++盘面行情  列表
    selectSurfaceQuotes(params) {
        return fetch("/quot_surface_pull", params);
    },
    // 获取国际行情
    selectInternationalQuote(params) {
        return fetch("/quot_international_pull", params);
    },
    // 买卖五档记录
    selectUnsettledGear(params) {
        return fetch("/buy_sell_pull", params);
    },
    // 获取k线数据
    selectKlineData(params) {
        return fetch("/kline_pull", params);
    },
    // 获取交易对
    getCurrencyList(params) {
        return fetch("/quot_exrate_pull", params);
    },
}