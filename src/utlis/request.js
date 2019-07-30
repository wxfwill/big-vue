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
			code: e.response && e.response.status,
			msg : errorText,
		};
	}
	return res.data;
}

export default request;