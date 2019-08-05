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

// 公益诉讼:最上方-受理、办结、在办总数
export const getTopSlBjZb = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/publicLitigation/getTopSlBjZb',
	params: data
});

// 公益诉讼:人均办结数
export const getPerCapitaHandlingList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/publicLitigation/getPerCapitaHandlingList',
	params: data
});

// 公益诉讼:民事公益诉讼基本情况
export const getCivilPublicLitigation = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/publicLitigation/getCivilPublicLitigation',
	params: data
});

// 获取公益诉讼:受理案件趋势
export const getCivilInvolvedField = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/publicLitigation/getCivilInvolvedField',
	params: data
});

// 公益诉讼:案均办理天数
export const getCasesAreHandledList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/publicLitigation/getCasesAreHandledList',
	params: data
});

// 获取公益诉讼:受理案件趋势
export const getAdministrationPublicLitigation = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/publicLitigation/getAdministrationPublicLitigation',
	params: data
});

// 公益诉讼:涉案领域统计分析-行政公益诉讼
export const getAdministrationInvolvedField = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/publicLitigation/getAdministrationInvolvedField',
	params: data
});