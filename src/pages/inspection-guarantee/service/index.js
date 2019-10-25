import request from "@/utlis/request";
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
// 获取大屏展示系统检务保障数据
export const getPSGuaranteeData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/psguarantee/getPSGuaranteeData',
	params: data
});

// 地区联动
export const getAreasList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/psguarantee/getAreas',
	params: data
});

// 获取收支总表数据
export const getIncomeAndPayCountList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/psguarantee/getIncomeAndPayCountList',
	params: data
});