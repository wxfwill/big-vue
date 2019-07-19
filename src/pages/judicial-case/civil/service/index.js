import request from '@/utlis/request';

// 获取大屏展示系统民事数据
export const getCivilData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/civil/getCivilData',
	params: data
});

// 获取民事:地图数据、民事案件案由发生次数排序数据
export const getCivilDataTwo = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/civil/getCivilDataTwo',
	params: data
});

// 获取民事:生效裁判监督
export const getEffectiveSupervision = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/civil/getEffectiveSupervision',
	params: data
});

// 获取民事:最上方-受理、办结、在办总数
export const getTopSlBjZb = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/civil/getTopSlBjZb',
	params: data
});