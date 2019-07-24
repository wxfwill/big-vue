import Vue   from "vue";
import axios from "axios";

/**
 * 创建axios实例
 * */
const service = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? 'http://141.3.119.210:8001/' : 'http://172.16.119.242:8001/',
	timeout: 30000,
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
			code   : e.response && e.response.status,
			msg    : errorText,
		};
	}
	return res.data;
}

/****************   统一管理接口   *************************/

/**************** 队伍管理模块 start********************/

// 获取省和市区接口
export const getAreas = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getAreas',
	params: data
});

// 通过姓名查询人员信息
export const getPersonInfo = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getPersonInfo',
	params: data
});

// 通过姓名查询人员信息
export const getPersonnelPerformance = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getPersonnelPerformance',
	params: data
});

// 获取队伍建建设数据
export const getTeamManagement = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getTeamManageData',
	//params: data
});

/**
 * 检查办公模块接口
 * **/
export const getProcuratorialOfficeData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/procuratorialOffice/getProcuratorialOfficeData',
	params: data
});
/**************** 队伍管理模块 end********************/


export default request;