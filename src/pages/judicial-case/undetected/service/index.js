import request from '@/utlis/request';

// 获取未检页面:不捕数
export const getNoCatchNumber = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/undetected/getNoCatchNumber',
	params: data
});

// 获取未检页面:未成年人犯罪占总犯罪百分率
export const getPercentageOfCrime = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/undetected/getPercentageOfCrime',
	params: data
});

// 获取大屏展示系统未检数据
export const getUndetectedData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/undetected/getUndetectedData',
	params: data
});