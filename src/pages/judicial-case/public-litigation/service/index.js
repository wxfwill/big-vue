import request from '@/utlis/request';

// 获取大屏展示系统公益诉讼数据
export const getPublicLitigationData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/publicLitigation/getPublicLitigationData',
	params: data
});

// 获取公益诉讼:受理案件趋势
export const getTrendsInAcceptingCasesList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/publicLitigation/getTrendsInAcceptingCasesList',
	params: data
});