export const businessConfigList = [{
	id   : 'tczsjcjys',
	name : '提出再审检察建议数',
	color: '#f79821',
}, {
	id   : 'spjdcnjcjys',
	name : '审判监督采纳检察建议数',
	color: '#00bff1',
}, {
	id   : 'tckss',
	name : '提出抗诉数',
	color: '#2fdb81',
}, {
	id   : 'cnzsjcjys',
	name : '采纳再审检察建议数',
	color: '#fbbb19',
}, {
	id   : 'zxjdcnjcjys',
	name : '执行监督采纳检察建议数',
	color: '#25c1e6'
}, {
	id   : 'ksajgbycps',
	name : '抗诉案件改变原裁判数',
	color: '#37e3c4',
}];

export const effectiveSupervisionConfig = [{
	id   : 'sljs',
	title: '受理(件)',
}, {
	id   : 'tckss',
	title: '提出抗诉数',
}, {
	id   : 'gbycps',
	title: '改变原裁判数',
}, {
	id   : 'tczsjcjys',
	title: '提出再审检察建议',
}, {
	id   : 'fycns',
	title: '法院采纳数',
}, {
	id   : 'zzscs',
	title: '中止审查数',
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
}];
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

// 复查纠正
export const reviewCorrectiveConfig = [{
	id  : 'ksjg',
	name: '抗诉结果'
}, {
	id  : 'cnzsjcjy',
	name: '采纳再审检察建议'
}, {
	id  : 'jdbzcjd',
	name: '决定不支持监督'
}];

// 跟进监督
export const followupSupConfig = [{
	id  : 'tcks',
	name: '提出抗诉'
}, {
	id  : 'tczsjcjy',
	name: '提出再审检察建议'
}, {
	id  : 'fyzsks',
	name: '法院再审抗诉'
}, {
	id  : 'ksjg',
	name: '抗诉结果'
}, {
	id  : 'jdbzcjd',
	name: '决定不支持监督'
}, {
	id  : 'zzsc',
	name: '终止审查'
}];