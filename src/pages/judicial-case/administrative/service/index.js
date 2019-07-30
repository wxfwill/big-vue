import request from '@/utlis/request';

// 获取大屏展示系统行政数据
export const getAdministrationData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/administration/getAdministrationData',
	params: data
});

// 获取行政:地图数据、案件性质数据
export const getCivilDataTwo = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/administration/getAdministrationDataTwo',
	params: data
});

// 获取行政:最上方-受理、办结、在办总数
export const getTopSlBjZb = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/administration/getTopSlBjZb',
	params: data
});