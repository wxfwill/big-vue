// 未检
export const undetectedChartConfig = [{
	id  : 'wj_sls',
	name: '受理数'
}, {
	id  : 'wj_bjs',
	name: '办结数'
}, {
	id  : 'wj_pzdbs',
	name: '批准逮捕数'
}, {
	id  : 'wj_bbs',
	name: '不批准逮捕数 '
}, {
	id  : 'wj_dbjs',
	name: '逮捕数'
}, {
	id  : 'wj_tqgss',
	name: '提起公诉数'
}, {
	id  : 'wj_bqss',
	name: '不起诉数'
}, {
	id  : 'wj_sxpjs',
	name: '生效判决数'
}];

// 控申
export const prosecutionConfig = [{
	id   : 'ks_slkgjs',
	title: '控告受理数',
}, {
	id   : 'ks_kgajbjs',
	title: '控告办结数',
}, {
	id   : 'ks_kgajzbs',
	title: '控告在办数',
}, {
	id   : 'ks_slsss',
	title: '申诉受理数',
}, {
	id   : 'ks_ssajbjs',
	title: '申诉办结数',
}, {
	id   : 'ks_ssajzbs',
	title: '申诉在办数',
}];

// 刑事概览
export const criminalCaseConfig   = [{
	id   : 'xs_sljs',
	rateId : 'xs_sljs_zb',
	name : '受理件数',
	color: '#FBBA18',
}, {
	id   : 'xs_bjjs',
	rateId : 'xs_bjjs_zb',
	name : '办结件数',
	color: '#009FE8',
}, {
	id   : 'xs_zbjs',
	rateId : 'xs_zbjs_zb',
	name : '在办件数',
	color: 'rgb(255, 108, 64)',
}, {
	id   : 'xs_pbdbs',
	rateId : 'xs_pbdbs_zb',
	name : '批捕逮捕数',
	color: '#b6a2de',
}, {
	id   : 'xs_qsajs',
	rateId : 'xs_qsajs_zb',
	name : '起诉案件数',
	color: '#1BC85D',
}];

// 民事
export const civilConfig = [{
	id   : 'ms_sljs',
	title: '受理数',
	color: '#005EFF',
}, {
	id   : 'ms_bjjs',
	title: '办结数',
	color: '#4FB8FF',
}, {
	id   : 'ms_tckss',
	title: '提出抗诉数',
	color: '#b6a2de',
}, {
	id   : 'ms_ksajgbyps',
	title: '改变原判数',
	color: '#59678c',
}, {
	id   : 'ms_tczsjcjys',
	title: '提出再审检察建议数',
	color: '#07a2a4',
}, {
	id   : 'ms_cnzsjcjys',
	title: '采纳数',
	color: '#a4d8c2',
}/*, {
 id   : 'ms_spjdcnjcjys',
 title: '审判监督采纳检察建议数',
 }, {
 id   : 'ms_zxjdcnjcjys',
 title: '执行监督采纳检察建议数',
 }*/];

// 行政
export const administrativeConfig = [{
	id    : 'xz_sljs',
	title : '受理数',
	col1  : '#FBBA18',
	col2  : '#FFA11E'
}, {
	id    : 'xz_zbjs',
	title : '办结数',
	col1  : '#005EFF',
	col2  : '#4FB8FF'
}, {
	id    : 'xz_bjjs',
	title : '在办数',
	col1  : '#F18126',
	col2  : '#FF6C40'
}, {
	id    : 'xz_tckss',
	title : '提出抗诉数',
	col1  : '#6be6c1',
	col2  : '#96dee8'
}, {
	id    : 'xz_tczsjcjys',
	title : '提出再审检察建议数',
	col1  : '#b6a2de',
	col2  : '#59678c',
}, {
	id    : 'xz_cnzsjcjys',
	title : '采纳数',
	col1  : '#32a487',
	col2  : '#4FB8FF'
}];

// 公益诉讼
export const publicInterestLitigationConfig = [{
	name: '行政公益诉讼',
	data: [{
		id  : 'xzgyss_xss',
		name: '线索数'
	}, {
		id  : 'xzgyss_las',
		name: '立案数'
	}, {
		id  : 'xzgyss_sqcxs',
		name: '诉前程序数'
	}, {
		id  : 'xzgyss_zbs',
		name: '在办数'
	}, {
		id  : 'xzgyss_bjs',
		name: '办结数'
	}]
}, {
	name: '民事公益诉讼',
	data: [{
		id  : 'msgyss_xss',
		name: '线索数'
	}, {
		id  : 'msgyss_las',
		name: '立案数'
	}, {
		id  : 'msgyss_sqcxs',
		name: '诉前程序数'
	}, {
		id  : 'msgyss_zbs',
		name: '在办数'
	}, {
		id  : 'msgyss_bjs',
		name: '办结数'
	}]
}];

// 队伍建设
export const troopAdministrationConfig = [{
	id  : 'dwgl_jcg',
	name: '员额内检察官',
}, {
	id  : 'dwgl_jcgzl',
	name: '检察官助理',
}, {
	id  : 'dwgl_sfxzry',
	name: '司法行政人员',
}];

// 年龄分布
export const ageStructureConfig = [
	{
	id  : 'nl1',
	name: '0-18岁'
}, {
	id  : 'nl2',
	name: '18-25岁'
}, {
	id  : 'nl3',
	name: '25-35岁'
}, {
	id  : 'nl4',
	name: '35-45岁'
}, {
	id  : 'nl5',
	name: '45-55岁'
}, {
	id  : 'nl6',
	name: '55岁以上'
}];

// 危险驾驶罪受教育程度
export const eduDegreeConfig = [
	{
	id  : 'bxrs',
	name: '不祥'
}, {
	id  : 'wmrs',
	name: '文盲'
}, {
	id  : 'xxrs',
	name: '小学'
}, {
	id  : 'czrs',
	name: '初中'
}, {
	id  : 'zzrs',
	name: '中专'
}, {
	id  : 'gzrs',
	name: '高中'
}, {
	id  : 'zjrs',
	name: '中技'
}, {
	id  : 'zkrs',
	name: '专科'
}, {
	id  : 'dxjysrs',
	name: '大学及以上'
}];

// 地图tooltip内容
export const mapTooltipConfig = [
	{
	id    : 'sls',
	name  : '受理数',
	regExp: '{sls}&nbsp;&nbsp;&nbsp; {sls_zb}%',
}, {
	id    : 'bjs',
	name  : '办结数',
	regExp: '{bjs}&nbsp;&nbsp;&nbsp; {bjs_zb}%',
}, {
	id    : 'zbs',
	name  : '在办数',
	regExp: '{zbs}&nbsp;&nbsp;&nbsp; {zbs_zb}%',
}/*, {
 id  : 'yejcg',
 name: '员额检察官',
 }, {
 id  : 'syjf',
 name: '使用经费',
 }*/];

export const topDataConfig    = [{
	id  : 'totalSls',
	name: '受理总数',
}, {
	id  : 'totalBjs',
	name: '办结总数',
}, {
	id  : 'totalZbs',
	name: '在办总数',
}];

export const leftSideList = [{
	id  : 'sls',
	name: '受理数',
}, {
	id  : 'bjs',
	name: '办结数',
}, {
	id  : 'zbs',
	name: '在办数',
}];


export const mapTableConfig = [{
	id  : 'name',
	name: '名称',
}, {
	id  : 'sls',
	name: '受理数',
}, {
	id  : 'bjs',
	name: '办结数',
}, {
	id  : 'zbs',
	name: '在办数',
}];

export const mapLineLegend = [{
	id  : 'sls',
	name: '受理数',
}, {
	id  : 'bjs',
	name: '办结数',
}, {
	id  : 'zbs',
	name: '在办数',
}];