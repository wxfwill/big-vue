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

