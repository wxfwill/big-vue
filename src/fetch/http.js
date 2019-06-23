import Vue from "vue";
import axios from "axios";
import qs from 'qs'
/**
 * 创建axios实例
 * */
const service = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? 'http://141.3.119.210:8001/' : 'http://172.16.119.242:8001/',
	timeout: 5000,
	headers: {
		'content-type'    : 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	}
});

async function request(config = {}) {
	let res = {};
	try {
		res = await service.request(config);
	} catch(e) {
		let errorText = "";
		switch(e.response && e.response.status) {
			case 404 :
				errorText = "404 Not Found";
				break;
			case 403 :
				errorText = "无权限访问";
				break;
			case 408:
				errorText = "服务器请求超时";
				break;
			case undefined:
				errorText = "请检查请求配置是否正确";
				break;
			default :
				errorText = "服务器请求超时";
		}
		res.data = {
			success: false,
			data   : errorText,
		};
	}
	return res.data;
}

/****************   统一管理接口   *************************/

/**
 * 队伍管理模块
 * */
export const getTeamManagement = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getTeamManageData',
	data
});

/**
 * 检查办公模块接口
 * **/
export const getProcuratorialOfficeData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/procuratorialOffice/getProcuratorialOfficeData',
	data
});

/**
 * 司法办案-民事模块-获取大屏展示系统民事数据
 * */
export const getCivilData = async (data) => await request({
	method: 'get',
	url   : `api/v1.0/civil/getCivilData?${qs.stringify(data)}`
});
/**
 * 司法办案-民事模块-获取民事:生效裁判监督
 * */
export const getEffectiveSupervision = async (data) => await request({
	method: 'get',
	url   : `api/v1.0/civil/getEffectiveSupervision?${qs.stringify(data)}`
});
/**
 * 司法办案-行政模块
 * */
export const getAdministrationData = async (data) => await request({
	method: 'get',
	url   : `api/v1.0/administration/getAdministrationData?${qs.stringify(data)}`
});
export default request;