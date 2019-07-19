import request from "@/utlis/request";

// 行政
export const getAdministration = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getAdministration',
	params: data
});

// 年龄结构分布
export const getAgeStructure = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getAgeStructure',
	params: data
});

// 民事案件概览
export const getCivilCase = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getCivilCase',
	params: data
});

// 刑事案件概览
export const getCriminalCase = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getCriminalCase',
	params: data
});

// 危险驾驶罪年度趋势分析
export const getDangerousDrivingList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getDangerousDrivingList',
	params: data
});

// 危险驾驶罪受教育程度
export const getEducationLevel = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getEducationLevel',
	params: data
});

// 公益诉讼
export const getHomePagaeData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getHomePagaeData',
	params: data
});

// 地图数据
export const getMapTopData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getMapTopData',
	params: data
});

// 控申
export const getProsecution = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getProsecution',
	params: data
});

// 起诉罪名top10集合
export const getProsecutionChargeList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getProsecutionChargeList',
	params: data
});

// 最上方-受理、办结、在办总数
export const getTopSlBjZb = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getTopSlBjZb',
	params: data
});

// 受理案件量趋势统计
export const getTrendStatisticsList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getTrendStatisticsList',
	params: data
});

// 队伍建设
export const getTroopAdministration = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getTroopAdministration',
	params: data
});

// 未检
export const getUndetected = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/homePage/getUndetected',
	params: data
});