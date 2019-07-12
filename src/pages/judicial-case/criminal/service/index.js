import request from '@/utlis/request';

// 获取刑事:受理案件数
export const getAcceptingCases = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getAcceptingCases',
	params: data
});

// 获取刑事:犯罪年龄分布
export const getAgeDistributionOfCrime = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getAgeDistributionOfCrime',
	params: data
});

// 获取刑事:案均办理天数
export const getAverageHandlingOfCasesList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getAverageHandlingOfCasesList',
	params: data
});

// 获取刑事:地图数据
export const getCriminalData = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getCriminalData',
	params: data
});

// 获取刑事:职务犯罪人数
export const getDutyCrime = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getDutyCrime',
	params: data
});

// 获取刑事:审查逮捕各类犯罪不捕情况-职务犯罪信息
export const getDutyRelatedCrime = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getDutyRelatedCrime',
	params: data
});

// 获取刑事:审查逮捕各类犯罪不捕情况-经济金融犯罪信息
export const getEconomicAndFinancialCrime = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getEconomicAndFinancialCrime',
	params: data
});

// 获取刑事:判决生效人数
export const getEffectiveJudgement = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getEffectiveJudgement',
	params: data
});

// 获取刑事:审查逮捕各类犯罪不捕情况-普通犯罪信息
export const getGeneralCrime = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getGeneralCrime',
	params: data
});

// 获取刑事:审查逮捕各类犯罪不捕情况-重大犯罪信息
export const getGrossCrime = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getGrossCrime',
	params: data
});

// 获取刑事:受理案件增长率最快的省市
export const getIncreaseRateOfAdmissibilityList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getIncreaseRateOfAdmissibilityList',
	params: data
});

// 获取刑事:罪名增长率 Top10
export const getIncreaseRateOfChargesList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getIncreaseRateOfChargesList',
	params: data
});

// 获取刑事:人均办结数
export const getPerCapitaSettlementList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getPerCapitaSettlementList',
	params: data
});

// 获取刑事:起诉案件数量及占比
export const getProsecutionCaseList = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getProsecutionCaseList',
	params: data
});

// 获取刑事:公诉各类业务受理情况
export const getPublicProsecutionBusiness = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getPublicProsecutionBusiness',
	params: data
});

// 获取刑事:审查逮捕各类犯罪不捕情况
export const getReviewArrest = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getReviewArrest',
	params: data
});

// 获取刑事:最上方-受理、办结、在办总数
export const getTopSlBjZb = async (data) => await request({
	method: 'get',
	url   : '/api/v1.0/criminal/getTopSlBjZb',
	params: data
});