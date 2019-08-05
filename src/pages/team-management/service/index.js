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

//通过姓名查询人员信息
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
	method: 'get',
	url   : '/api/v1.0/teamManage/getTeamManageMaps',
	params :data
});

// 队伍建设:全国在职人数
export const getIncumbency = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getIncumbency',
	params :data
});
//队伍建设:工作年限统计
export const getWorkingLife = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getWorkingLife',
	params :data
});
//队伍建设:教育情况
export const getEducationSituation = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getEducationSituation',
	params :data
});
//队伍建设:各级检察机关人员现状
export const getPersonnelStatusQuoList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getPersonnelStatusQuoList',
	params :data
});
//队伍建设:人员学历结构
export const getPersonnelEducation = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getPersonnelEducation',
	params :data
});
//队伍建设:年龄分布
export const getAgeDistribution = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getAgeDistribution',
	params :data
});
//队伍建设:最上方-员额内检察官、检察官助理、司法行政人员总数
export const getPersonnelCategory = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/teamManage/getPersonnelCategory',
	params :data
});
