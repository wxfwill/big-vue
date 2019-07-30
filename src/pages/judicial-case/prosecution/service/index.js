import request from '@/utlis/request';

// 获取大屏展示系统控申数据
export const getChargeAppealData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/chargeAppeal/getChargeAppealData',
	params: data
});

// 获取控申:赔偿案件数据
export const getCompensationCase = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/chargeAppeal/getCompensationCase',
	params: data
});

// 获取控申:信访数据集合
export const getJudicialReparation = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/chargeAppeal/getLettersAndVisitsList',
	params: data
});

// 获取控申:举报线索数据集合
export const getReportingCluesList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/chargeAppeal/getReportingCluesList',
	params: data
});


// 获取控申:信访数据集合
export const getLettersAndVisitsList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/chargeAppeal/getLettersAndVisitsList',
	params: data
});