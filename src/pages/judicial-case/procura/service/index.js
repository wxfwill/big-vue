import request from '@/utlis/request';

// 检委办:获取大屏展示系统检委办数据
export const getCheckCharterData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/checkCharter/getCheckCharterData',
	params: data
});
// 地图数据
export const getMapTopData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getMapTopData',
	params: data
});
// 最上方-受理、办结、在办总数
export const getTopSlBjZb = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getTopSlBjZb',
	params: data
});
// 获取刑事:地图数据
export const getCriminalData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getCriminalData',
	params: data
});