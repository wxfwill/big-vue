import request from "@/utlis/request";

// 获取省和市区接口
export const getAreas = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getAreas',
	params: data
});

// 通过姓名查询人员信息
export const getPersonInfo = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getPersonInfo',
	params: data
});

// 通过姓名查询人员信息
export const getPersonnelPerformance = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getPersonnelPerformance',
	params: data
});

// 获取队伍建建设数据
export const getTeamManagement = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getTeamManageData',
	params: data
});

// 获取队伍建设地图数据
export const getTeamManageMap = async (data) => await request({
	method: 'post',
	url   : '/api/v1.0/teamManage/getTeamManageMaps',
	data
});