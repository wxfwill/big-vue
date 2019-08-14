// 未检
export const undetectedChartConfig = [{
	id  : 'wj_bbs',
	name: '不捕数'
}, {
	id  : 'wj_bjs',
	name: '办结数'
}, {
	id  : 'wj_bqss',
	name: '不起诉数'
}, {
	id  : 'wj_kss',
	name: '抗诉数'
}, {
	id  : 'wj_pzdbs',
	name: '批准逮捕数'
}, {
	id  : 'wj_sls',
	name: '受理数'
}, {
	id  : 'wj_sxpjs',
	name: '生效判决数'
}, {
	id  : 'wj_tqgss',
	name: '提起公诉数'
}];

// 控申
export const prosecutionConfig = [{
	id   : 'ks_slkgjs',
	title: '受理控告件数',
}, {
	id   : 'ks_slsss',
	title: '受理申诉数',
}, {
	id   : 'ks_ccyslajs',
	title: '初查移送立案件数',
}, {
	id   : 'ks_kgajzbs',
	title: '控告案件在办数',
}, {
	id   : 'ks_kgajbjs',
	title: '控告案件办结数',
}, {
	id   : 'ks_ssajzbs',
	title: '申诉案件在办数',
}, {
	id   : 'ks_ssajbjs',
	title: '申诉案件办结数',
}];

// 刑事概览
export const criminalCaseConfig   = [{
	id   : 'xs_sljs',
	name : '受理件数',
	color: '#1BC85D',
}, {
	id   : 'xs_zbjs',
	name : '在办件数',
	color: '#009FE8',
}, {
	id   : 'xs_bjjs',
	name : '办结件数',
	color: '#1BC85D',
}, {
	id   : 'xs_pbdbs',
	name : '批捕逮捕数',
	color: '#009FE8',
}, {
	id   : 'xs_jzlbrs',
	name : '纠正漏捕人数',
	color: '#009FE8',
}, {
	id   : 'xs_qsajs',
	name : '起诉案件数',
	color: '#FBBA18',
}];
// 行政
export const administrativeConfig = [{
	id    : 'xz_sljs',
	rateId: 'xz_sljs_zb',
	title : '受理件数',
	col1  : '#22A95F',
	col2  : '#4FDC99'
}, {
	id    : 'xz_bjjs',
	rateId: 'xz_bjjs_zb',
	title : '办结件数',
	col1  : '#005EFF',
	col2  : '#4FB8FF'
}, {
	id    : 'xz_zbjs',
	rateId: 'xz_zbjs_zb',
	title : '在办件数',
	col1  : '#FFA11E',
	col2  : '#F3C85D'
}];

// 公益诉讼
export const publicInterestLitigationConfig = [{
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
}, {
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
export const ageStructureConfig = [{
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
export const eduDegreeConfig = [{
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
export const mapTooltipConfig = [{
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