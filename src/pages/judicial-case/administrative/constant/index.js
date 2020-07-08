export const conditionConfig = [{
	id   : 'slajs',
	title: '受理数',
}, {
	id   : 'bjjs',
	title: '办结数',
}, {
	id     : 'bjl',
	title  : '办结率',
	binding: '%'
}, {
	id   : 'tcjdjs',
	title: '提出监督数',
}, {
	id     : 'tcjdl',
	title  : '提出监督率',
	binding: '%'
}, {
	id   : 'zzscjs',
	title: '中止审查',
}];

export const behaviorConfig = [{
	id   : 'sls',
	title: '受理(件)',
}, {
	id   : 'bjs',
	title: '办结(件)',
}, {
	id   : 'bjl',
	title: '办结率(%)',
}, {
	id   : 'tcjcjys',
	title: '提出检察建议数	',
}, {
	id   : 'fycnjcjys',
	title: '法院采纳数',
}];

export const judgmentConfig = [{
	id   : 'sljs',
	title: '受理件数',
	color: '#FBC31F'
}, {
	id   : 'tckss',
	title: '提出抗诉数',
	color: '#21CE68'
}, {
	id   : 'gbycps',
	title: '改变原裁判数',
	color: '#21CE68'
}, {
	id   : 'tczsjcjys',
	title: '提出再审检察建议',
	color: '#00B1ED'
}, {
	id   : 'fycns',
	title: '法院采纳数',
	color: '#00B1ED'
}, {
	id   : 'zzscs',
	title: '中止审查数',
	color: '#39E4C6'
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

export const executeConfig = [{
	id   : 'sljs',
	title: '受理(件)',
}, {
	id   : 'bjjs',
	title: '办结(件)',
}, {
	id   : 'bjl',
	title: '办结率(%)',
}, {
	id   : 'tcjcjys',
	title: '提出检察建议数',
}, {
	id   : 'cnjcjys',
	title: '法院采纳数',
}];

export const classifyConfig = [{
	id  : 'sxcpjd',
	name: '生效裁判监督'
}, {
	id  : 'wfxwjd',
	name: '违法行为监督'
}, {
	id  : 'zxhdjd',
	name: '执行活动监督'
}];

export const followupConfig = [{
	id   : 'tcks',
	name: '提出抗诉',
}, {
	id   : 'tczsjcjy',
	name: '提出再审检察建议',
}, {
	id   : 'fyzsks',
	name: '法院再审抗诉',
}, {
	id   : 'jdbzcjd',
	name: '决定不支持监督',
}, {
	id   : 'zzsc',
	name: '终止审查',
}, {
	id   : 'ksjg',
	name: '抗诉结果',
}];